using AdIns.DataModel.Query;
using AdIns.Exp.ExceptionCustomType;
using AdIns.Foundation.Core.Query;
using AdIns.Foundation.DTO.Paging;
using AdIns.Util;
using AdIns.Util.HttpClientManager;
using AdIns.Util.Query;
using AdIns.Util.Setting;
using AdIns.Util.SQLService;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace AdIns.Template.API.Controllers.Generic
{
    /// <summary>
    /// Generic
    /// </summary>
    public class GenericSvc
    {
        private readonly string[] _exceptionCommand = { "INSERT", "UPDATE", "DELETE", "TRUNCATE" };

        /// <summary>
        /// Get Paging Object By SQL With Api
        /// </summary>
        /// <param name="genericPagingObj"></param>
        /// <param name="connStr"></param>
        /// <returns></returns>
        public virtual async Task<PagingResult> GetPagingObjectBySQLWithApi(GenericPagingObj genericPagingObj, string connStr)
        {
            DataTable dtResult = new DataTable();
            string whereCond = string.Empty;

            #region CR QueryString di BackEnd

            if (!string.IsNullOrWhiteSpace(genericPagingObj.QueryString.Name))
            {
                var queryName = "QueryString:" + genericPagingObj.QueryString.Name;
                genericPagingObj.QueryString.Select = QueryPagingConfiguration.PagingSetting[queryName + ":Select"];
                genericPagingObj.QueryString.From = QueryPagingConfiguration.PagingSetting[queryName + ":From"];
                genericPagingObj.QueryString.Where = QueryPagingConfiguration.PagingSetting[queryName + ":Where"];
                genericPagingObj.QueryString.GroupBy = QueryPagingConfiguration.PagingSetting[queryName + ":GroupBy"];
            }

            #endregion CR QueryString di BackEnd

            whereCond = setWhereCond(genericPagingObj, whereCond);

            string orderBy;
            orderBy = setOrderBy(genericPagingObj.OrderBy, genericPagingObj.QueryString);

            string selectAfterGroupBy = genericPagingObj.QueryString.Select;
            if (!string.IsNullOrEmpty(genericPagingObj.QueryString.GroupBy))
            {
                selectAfterGroupBy = "SELECT ROW_NUMBER()OVER(ORDER BY " + orderBy + ") AS Rn, " + genericPagingObj.QueryString.Select?.Substring(7);
            }
            int top = (genericPagingObj.RowPerPage * 5);
            selectAfterGroupBy = "SELECT TOP(" + top.ToString() + ") " + genericPagingObj.QueryString.Select?.Substring(7);
            string groupBy = genericPagingObj.QueryString.GroupBy ?? string.Empty;

            #region SQL SERVICE

            List<KeyValuePair<string, string>> listofParameters = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("SelectCond", selectAfterGroupBy),
                new KeyValuePair<string, string>("FromCond", genericPagingObj.QueryString.From),
                new KeyValuePair<string, string>("WhereCond", whereCond),
                new KeyValuePair<string, string>("OrderBy", orderBy),
                new KeyValuePair<string, string>("GroupByCond", groupBy)
            };

            #endregion SQL SERVICE

            PagingResult pagingResult = await spGet_ExecuteQueryPagingGenericApi(connStr, dtResult, listofParameters);

            if (genericPagingObj.IntegrationObj is not null && pagingResult.Data.Rows.Count > 0)
            {
                int Skip = (genericPagingObj.PageNo - 1) * genericPagingObj.RowPerPage;
                IntegrationObj integrationObj = genericPagingObj.IntegrationObj;
                DataTable dtblRight = await HttpHelper.PostRequest<DataTable>(integrationObj.BaseUrl, integrationObj.ApiPath, null, integrationObj.RequestObj);
                DataTable dtCombine = DataTableHelper.JoinTwoDataTablesOnOneColumn(pagingResult.Data, dtblRight, integrationObj.LeftColumnToJoin, integrationObj.RightColumnToJoin, DataTableHelper.JoinType.Inner, Skip, genericPagingObj.RowPerPage, out int count);
                pagingResult.Count = count;
                pagingResult.Data = dtCombine;
            }
            return pagingResult;
        }

        /// <summary>
        /// spGet Execute Query Paging Generic Api
        /// </summary>
        /// <param name="connStr"></param>
        /// <param name="dtResult"></param>
        /// <param name="listofParameters"></param>
        /// <returns></returns>
        public async Task<PagingResult> spGet_ExecuteQueryPagingGenericApi(string connStr, DataTable dtResult, List<KeyValuePair<string, string>> listofParameters)
        {
            #region STORED PROCEDURE

            SqlConnection sqlConn = (SqlConnection)DBHelper.getConnection(connStr);
            int TotalRecords = 0;
            try
            {
                SqlCommand command = new SqlCommand("dbo.spQueryPaging_GenericWithApi", sqlConn);
                command.Parameters.Clear();
                command.CommandType = CommandType.StoredProcedure;

                foreach (KeyValuePair<string, string> keyValue in listofParameters)
                {
                    command.Parameters.AddWithValue("@" + keyValue.Key, keyValue.Value);
                }
                if (sqlConn.State == ConnectionState.Closed) await sqlConn.OpenAsync();
                while (sqlConn.State == ConnectionState.Connecting) await Task.Delay(1000);

                SqlDataReader reader = await command.ExecuteReaderAsync();
                dtResult.Load(reader);
            }
            catch (System.Exception)
            {
                throw;
            }
            finally
            {
                if (sqlConn != null && sqlConn.State == ConnectionState.Open)
                {
                    sqlConn.Close();
                    sqlConn.Dispose();
                }
            }
            PagingResult pagingResult = new PagingResult();
            pagingResult.Data = dtResult;
            pagingResult.Count = TotalRecords;

            #endregion STORED PROCEDURE

            return pagingResult;
        }

        /// <summary>
        /// Get Paging Object By SQL Async
        /// </summary>
        /// <param name="genericPagingObj"></param>
        /// <param name="connStr"></param>
        /// <returns></returns>
        public virtual async Task<PagingResult> GetPagingObjectBySQLAsync(GenericPagingObjDataTable genericPagingObj, string connStr)
        {
            DataTable dtResult = new DataTable();
            DataTable dtblRight = new DataTable();
            string whereCond = string.Empty;
            string WhereCondJoin = string.Empty;
            string OrderByHardcode = string.Empty;
            SetQueryString(genericPagingObj, ref OrderByHardcode);
            PagingResult pagingResult = new PagingResult();
            if (genericPagingObj.IntegrationObj is not null)
            {
                IntegrationObj integrationObj = genericPagingObj.IntegrationObj;
                dtblRight = await HttpHelper.PostRequest<DataTable>(integrationObj.BaseUrl, integrationObj.ApiPath, null, integrationObj.RequestObj);

                if (dtblRight.Rows.Count == 0)
                {
                    pagingResult = SetNullData();
                    return pagingResult;
                }
                string whereCondCrit = GenerateCriteriaObjV2.GenerateCriteriaForDataTable(genericPagingObj.Criteria.Where(x => x.IsCriteriaDataTable).ToArray());

                if (!string.IsNullOrEmpty(whereCondCrit))
                {
                    var dr = dtblRight.Select(whereCondCrit);
                    if (!dr.Any())
                    {
                        pagingResult = SetNullData();
                        return pagingResult;
                    }
                    dtblRight = dr.CopyToDataTable();
                }

                WhereCondJoin = setWhereCondJoinTypeInner(integrationObj, dtblRight, genericPagingObj.QueryString, WhereCondJoin);
            }

            string orderBy = SetWhereCondAndOrderBy(genericPagingObj, WhereCondJoin, ref whereCond);

            if (!string.IsNullOrEmpty(orderBy) && !string.IsNullOrWhiteSpace(OrderByHardcode))
            {
                orderBy = OrderByHardcode + "," + orderBy;
            }
            string selectAfterGroupBy = genericPagingObj.QueryString.Select;
            if (!string.IsNullOrEmpty(genericPagingObj.QueryString.GroupBy))
            {
                selectAfterGroupBy = "SELECT ROW_NUMBER()OVER(ORDER BY " + orderBy + ") AS Rn, " + genericPagingObj.QueryString.Select.Substring(7);
            }

            string groupBy = genericPagingObj.QueryString.GroupBy ?? string.Empty;
            #region SQL SERVICE

            List<KeyValuePair<string, string>> listofParameters = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("PageNo", genericPagingObj.PageNo.ToString()),
                new KeyValuePair<string, string>("RowPerPage", genericPagingObj.RowPerPage.ToString()),
                new KeyValuePair<string, string>("SelectCond", selectAfterGroupBy),
                new KeyValuePair<string, string>("FromCond", genericPagingObj.QueryString.From),
                new KeyValuePair<string, string>("WhereCond", whereCond),
                new KeyValuePair<string, string>("OrderBy", orderBy),
                new KeyValuePair<string, string>("GroupByCond", groupBy)
            };

            #endregion SQL SERVICE

            CheckSQLInjection(listofParameters);
            pagingResult = await SQLService.spGet_ExecuteQueryPagingGenericAsync(connStr, dtResult, listofParameters);
            if (genericPagingObj.IntegrationObj is not null)
            {
                int TotalData = pagingResult.Count;
                pagingResult = JoinPagingResultWithExternalApi(genericPagingObj, dtblRight, pagingResult.Data);
                pagingResult.Count = TotalData;
            }
            return pagingResult;
        }

        #region PRIVATE METHOD
        private static PagingResult SetNullData()
        {
            PagingResult pagingResult = new PagingResult();
            pagingResult.Data = new DataTable();
            pagingResult.Count = 0;
            return pagingResult;
        }
        private void CheckSQLInjection(List<KeyValuePair<string, string>> listofParameters)
        {
            #region CHECKING INSERT UPDATE DELETE

            bool isCommandContainsException = false;
            foreach (KeyValuePair<string, string> keyValuePair in listofParameters)
            {
                if (!isCommandContainsException)
                {
                    string value = keyValuePair.Value.ToUpper();
                    if (_exceptionCommand.Any(t => value.Contains(t)))
                    {
                        isCommandContainsException = true;
                    }
                }
                else
                {
                    break;
                }
            }
            if (isCommandContainsException)
            {
                throw new AdInsCustomException("CONTAINS_COMMAND_EXCEPTION", _exceptionCommand);
            }

            #endregion CHECKING INSERT UPDATE DELETE
        }
        private static string SetWhereCondAndOrderBy(GenericPagingObjDataTable genericPagingObj, string WhereCondJoin, ref string whereCond)
        {
            if (genericPagingObj.QueryString.WhereQuery != null)
            {
                whereCond += string.Format(genericPagingObj.QueryString.Where, genericPagingObj.QueryString.WhereQuery);
            }
            else
            {
                whereCond += genericPagingObj.QueryString.Where;
            }

            if (!string.IsNullOrEmpty(whereCond))
            {
                string whereCondCrit = GenerateCriteriaObjV2.GenerateCriteriaForSP(genericPagingObj.Criteria.Where(x => !x.IsCriteriaDataTable).ToArray());
                if (!string.IsNullOrEmpty(whereCondCrit))
                {
                    whereCond += " AND (" + whereCondCrit + ") ";
                }
            }
            else
            {
                whereCond = GenerateCriteriaObjV2.GenerateCriteriaForSP(genericPagingObj.Criteria.Where(x => !x.IsCriteriaDataTable).ToArray());
                if (!string.IsNullOrEmpty(whereCond))
                {
                    whereCond = " WHERE " + whereCond;
                }
            }

            if (!string.IsNullOrEmpty(whereCond) && !string.IsNullOrEmpty(WhereCondJoin))
            {
                whereCond += " AND (" + WhereCondJoin + ") ";
            }
            else if (string.IsNullOrEmpty(whereCond) && !string.IsNullOrWhiteSpace(WhereCondJoin))
            {
                whereCond = " WHERE " + WhereCondJoin;
            }

            string orderBy = string.Empty;
            orderBy = setOrderBy(genericPagingObj.OrderBy, genericPagingObj.QueryString);

            return orderBy;
        }

        private static void SetQueryString(GenericPagingObjDataTable genericPagingObj, ref string OrderBy)
        {
            #region CR QueryString di BackEnd

            if (!string.IsNullOrWhiteSpace(genericPagingObj.QueryString.Name))
            {
                var queryName = "QueryString:" + genericPagingObj.QueryString.Name;
                genericPagingObj.QueryString.Select = QueryPagingConfiguration.PagingSetting[queryName + ":Select"];
                genericPagingObj.QueryString.From = QueryPagingConfiguration.PagingSetting[queryName + ":From"];
                genericPagingObj.QueryString.Where = QueryPagingConfiguration.PagingSetting[queryName + ":Where"];
                genericPagingObj.QueryString.GroupBy = QueryPagingConfiguration.PagingSetting[queryName + ":GroupBy"];
                OrderBy = QueryPagingConfiguration.PagingSetting[queryName + ":OrderBy"];
            }

            #endregion CR QueryString di BackEnd
        }

        private static PagingResult JoinPagingResultWithExternalApi(GenericPagingObjDataTable genericPagingObj, DataTable dtblRight, DataTable dtblLeft)
        {
            PagingResult pagingResult = new PagingResult();
            IntegrationObj integrationObj = genericPagingObj.IntegrationObj;
            string JoinType = integrationObj.JoinType;
            Dictionary<string, DataTableHelper.JoinType> DictJoinType = new Dictionary<string, DataTableHelper.JoinType>
            {
                { "LEFT", DataTableHelper.JoinType.Left },
                { "INNER", DataTableHelper.JoinType.Inner }
            };
            DataTableHelper.JoinType joinType = DictJoinType.FirstOrDefault(x => x.Key == JoinType.ToUpper()).Value;
            pagingResult.Data = DataTableHelper.JoinTwoDataTablesOnOneColumn(dtblLeft, dtblRight, integrationObj.LeftColumnToJoin, integrationObj.RightColumnToJoin, joinType);
            return pagingResult;
        }

        private static string setWhereCond(GenericPagingObj genericPagingObj, string whereCond)
        {
            if (genericPagingObj.QueryString.WhereQuery != null)
            {
                whereCond += string.Format(genericPagingObj.QueryString.Where, genericPagingObj.QueryString.WhereQuery);
            }
            else
            {
                whereCond += genericPagingObj.QueryString.Where;
            }

            if (!string.IsNullOrEmpty(whereCond))
            {
                string whereCondCrit = GenerateCriteriaObj.GenerateCriteriaForSP(genericPagingObj.Criteria);
                if (!string.IsNullOrEmpty(whereCondCrit))
                {
                    whereCond += " AND (" + whereCondCrit + ") ";
                }
            }
            else
            {
                whereCond = GenerateCriteriaObj.GenerateCriteriaForSP(genericPagingObj.Criteria);
                if (!string.IsNullOrEmpty(whereCond))
                {
                    whereCond = " WHERE " + whereCond;
                }
            }
            return whereCond;
        }

        private static string setOrderBy(OrderByObj OrderBy, QueryStringObj QueryString)
        {
            string orderByValue;
            if (OrderBy != null)
            {
                orderByValue = OrderBy.Key + (OrderBy.Value ? " ASC" : " DESC");
            }
            else
            {
                string select = QueryString.Select?.ToUpper().Replace("SELECT ", "");
                List<string> selectArr = select.Split(",").ToList();
                int indexAs = selectArr[0].IndexOf(" AS ");
                if (indexAs > 0)
                    orderByValue = selectArr[0]?.Substring(0, indexAs) + " ASC";
                else
                    throw new AdInsCustomException("INDEX_OF_AS");
            }
            return orderByValue;
        }

        private static string setWhereCondJoinTypeInner(IntegrationObj integrationObj, DataTable dtblRight, QueryStringObj QueryString, string WhereCondJoin)
        {
            if (integrationObj.JoinType.ToUpper() != "INNER") return WhereCondJoin;
            List<string> list = dtblRight.AsEnumerable().Select(r => r.Field<string>($"{integrationObj.RightColumnToJoin}")).ToList();

            list = list.Select(x => x.Replace(x, $"N'{x}'")).ToList();
            WhereCondJoin = string.Join(",", list);

            string select = QueryString.Select.Replace("SELECT ", "");
            List<string> selectArr = select.Split(",").ToList();
            string arr = selectArr.FirstOrDefault(x => x.Contains($"{integrationObj.LeftColumnToJoin}"));
            int indexAs = arr.IndexOf(" AS ");
            if (indexAs > 0)
            {
                WhereCondJoin = $"{arr.Substring(0, indexAs)} IN({WhereCondJoin}) ";
            }
            else
            {
                throw new AdInsCustomException("INDEX_OF_AS");
            }
            return WhereCondJoin;
        }
        #endregion


        #region Version 2.1
        /// <summary>
        /// Get Paging Object By SQL Async
        /// </summary>
        /// <param name="genericPagingObj"></param>
        /// <param name="connStr"></param>
        /// <returns></returns>
        public virtual async Task<PagingResult> GetPagingObjectBySQLAsync(GenericPagingObjDataTable_V2_1 genericPagingObj, string connStr)
        {
            DataTable dtResult = new DataTable();
            DataTable dtblRight = new DataTable();
            string whereCond = string.Empty;
            string WhereCondJoin = string.Empty;
            string OrderByHardcode = string.Empty;
            SetQueryString(genericPagingObj, ref OrderByHardcode);
            PagingResult pagingResult = new PagingResult();
            if (genericPagingObj.IntegrationObj is not null)
            {
                IntegrationObj integrationObj = genericPagingObj.IntegrationObj;
                dtblRight = await HttpHelper.PostRequest<DataTable>(integrationObj.BaseUrl, integrationObj.ApiPath, null, integrationObj.RequestObj);

                if (dtblRight.Rows.Count == 0)
                {
                    pagingResult = SetNullData();
                    return pagingResult;
                }
                string whereCondCrit = GenerateCriteriaObjV2.GenerateCriteriaForDataTable(genericPagingObj.Criteria.Where(x => x.IsCriteriaDataTable).ToArray());

                if (!string.IsNullOrEmpty(whereCondCrit))
                {
                    var dr = dtblRight.Select(whereCondCrit);
                    if (!dr.Any())
                    {
                        pagingResult = SetNullData();
                        return pagingResult;
                    }
                    dtblRight = dr.CopyToDataTable();
                }

                WhereCondJoin = setWhereCondJoinTypeInner(integrationObj, dtblRight, genericPagingObj.QueryString, WhereCondJoin);
            }

            string orderBy = SetWhereCondAndOrderBy(genericPagingObj, WhereCondJoin, ref whereCond);

            if (!string.IsNullOrEmpty(orderBy) && !string.IsNullOrWhiteSpace(OrderByHardcode))
            {
                orderBy = OrderByHardcode + "," + orderBy;
            }
            string selectAfterGroupBy = genericPagingObj.QueryString.Select;
            if (!string.IsNullOrEmpty(genericPagingObj.QueryString.GroupBy))
            {
                selectAfterGroupBy = "SELECT ROW_NUMBER()OVER(ORDER BY " + orderBy + ") AS Rn, " + genericPagingObj.QueryString.Select.Substring(7);
            }

            string groupBy = genericPagingObj.QueryString.GroupBy ?? string.Empty;
            #region SQL SERVICE

            List<KeyValuePair<string, string>> listofParameters = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("PageNo", genericPagingObj.PageNo.ToString()),
                new KeyValuePair<string, string>("RowPerPage", genericPagingObj.RowPerPage.ToString()),
                new KeyValuePair<string, string>("SelectCond", selectAfterGroupBy),
                new KeyValuePair<string, string>("FromCond", genericPagingObj.QueryString.From),
                new KeyValuePair<string, string>("WhereCond", whereCond),
                new KeyValuePair<string, string>("OrderBy", orderBy),
                new KeyValuePair<string, string>("GroupByCond", groupBy)
            };

            #endregion SQL SERVICE

            CheckSQLInjection(listofParameters);
            pagingResult = await SQLService.spGet_ExecuteQueryPagingGenericAsync(connStr, dtResult, listofParameters);
            if (genericPagingObj.IntegrationObj is not null)
            {
                int TotalData = pagingResult.Count;
                pagingResult = JoinPagingResultWithExternalApi(genericPagingObj, dtblRight, pagingResult.Data);
                pagingResult.Count = TotalData;
            }
            return pagingResult;
        }
        private static string SetWhereCondAndOrderBy(GenericPagingObjDataTable_V2_1 genericPagingObj, string WhereCondJoin, ref string whereCond)
        {
            if (genericPagingObj.QueryString.WhereQuery != null)
            {
                whereCond += string.Format(genericPagingObj.QueryString.Where, genericPagingObj.QueryString.WhereQuery);
            }
            else
            {
                whereCond += genericPagingObj.QueryString.Where;
            }

            if (!string.IsNullOrEmpty(whereCond))
            {
                string whereCondCrit = GenerateCriteriaObjV2.GenerateCriteriaForSP(genericPagingObj.Criteria.Where(x => !x.IsCriteriaDataTable).ToArray());
                if (!string.IsNullOrEmpty(whereCondCrit))
                {
                    whereCond += " AND (" + whereCondCrit + ") ";
                }
            }
            else
            {
                whereCond = GenerateCriteriaObjV2.GenerateCriteriaForSP(genericPagingObj.Criteria.Where(x => !x.IsCriteriaDataTable).ToArray());
                if (!string.IsNullOrEmpty(whereCond))
                {
                    whereCond = " WHERE " + whereCond;
                }
            }

            if (!string.IsNullOrEmpty(whereCond) && !string.IsNullOrEmpty(WhereCondJoin))
            {
                whereCond += " AND (" + WhereCondJoin + ") ";
            }
            else if (string.IsNullOrEmpty(whereCond) && !string.IsNullOrWhiteSpace(WhereCondJoin))
            {
                whereCond = " WHERE " + WhereCondJoin;
            }

            string orderBy = string.Empty;
            orderBy = setOrderBy(genericPagingObj.OrderBy, genericPagingObj.QueryString);

            return orderBy;
        }
        private static void SetQueryString(GenericPagingObjDataTable_V2_1 genericPagingObj, ref string OrderBy)
        {
            #region CR QueryString di BackEnd

            if (!string.IsNullOrWhiteSpace(genericPagingObj.QueryString.Name))
            {
                var queryName = "QueryString:" + genericPagingObj.QueryString.Name;
                genericPagingObj.QueryString.Select = QueryPagingConfiguration.PagingSetting[queryName + ":Select"];
                genericPagingObj.QueryString.From = QueryPagingConfiguration.PagingSetting[queryName + ":From"];
                genericPagingObj.QueryString.Where = QueryPagingConfiguration.PagingSetting[queryName + ":Where"];
                genericPagingObj.QueryString.GroupBy = QueryPagingConfiguration.PagingSetting[queryName + ":GroupBy"];
                if (genericPagingObj.QueryString.FromQuery != null && genericPagingObj.QueryString.FromQuery.Any())
                {
                    genericPagingObj.QueryString.From = string.Format(genericPagingObj.QueryString.From, genericPagingObj.QueryString.FromQuery);
                }
                OrderBy = QueryPagingConfiguration.PagingSetting[queryName + ":OrderBy"];
            }

            #endregion CR QueryString di BackEnd
        }
        private static PagingResult JoinPagingResultWithExternalApi(GenericPagingObjDataTable_V2_1 genericPagingObj, DataTable dtblRight, DataTable dtblLeft)
        {
            PagingResult pagingResult = new PagingResult();
            IntegrationObj integrationObj = genericPagingObj.IntegrationObj;
            string JoinType = integrationObj.JoinType;
            Dictionary<string, DataTableHelper.JoinType> DictJoinType = new Dictionary<string, DataTableHelper.JoinType>
            {
                { "LEFT", DataTableHelper.JoinType.Left },
                { "INNER", DataTableHelper.JoinType.Inner }
            };
            pagingResult.Data = DataTableHelper.JoinTwoDataTablesOnOneColumn(dtblLeft, dtblRight, integrationObj.LeftColumnToJoin, integrationObj.RightColumnToJoin, DictJoinType.Where(x => x.Key == JoinType.ToUpper()).Select(x => x.Value).FirstOrDefault());
            return pagingResult;
        }
        #endregion
    }
}