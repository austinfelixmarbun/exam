using AdIns.Exp.ExceptionCustomType;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace AdIns.Template.API.Controllers.Generic
{
    /// <summary>
    /// Data Table Helper
    /// </summary>
    public static class DataTableHelper
    {
        /// <summary>
        /// Join Type
        /// </summary>
        public enum JoinType
        {
            /// <summary>
            /// Same as regular join. Inner join produces only the set of records that match in both Table A and Table B.
            /// </summary>
            Inner = 0,

            /// <summary>
            /// Same as Left Outer join. Left outer join produces a complete set of records from Table A, with the matching records (where available) in Table B. If there is no match, the right side will contain null.
            /// </summary>
            Left = 1
        }

        /// <summary>
        /// Joins the passed in DataTables on the colToJoinOn.
        /// <para>Returns an appropriate DataTable with zero rows if the colToJoinOn does not exist in both tables.</para>
        /// </summary>
        /// <param name="dtblLeft"></param>
        /// <param name="dtblRight"></param>
        /// <param name="LeftColumnToJoin"></param>
        /// <param name="RightColumnToJoin"></param>
        /// <param name="joinType"></param>
        /// <returns></returns>
        /// <remarks>
        /// <para>http://stackoverflow.com/questions/2379747/create-combined-datatable-from-two-datatables-joined-with-linq-c-sharp?rq=1</para>
        /// <para>http://msdn.microsoft.com/en-us/library/vstudio/bb397895.aspx</para>
        /// <para>http://www.codinghorror.com/blog/2007/10/a-visual-explanation-of-sql-joins.html</para>
        /// <para>http://stackoverflow.com/questions/406294/left-join-and-left-outer-join-in-sql-server</para>
        /// </remarks>
        public static DataTable JoinTwoDataTablesOnOneColumn(DataTable dtblLeft, DataTable dtblRight, string LeftColumnToJoin, string RightColumnToJoin, JoinType joinType)
        {
            //Change column name to a temp name so the LINQ for getting row data will work properly.
            string strTempColName = RightColumnToJoin;
            bool isRenameColumn = false;

            if (dtblRight.Columns.Contains(LeftColumnToJoin))
            {
                strTempColName = strTempColName + "_2";
                dtblRight.Columns[RightColumnToJoin].ColumnName = strTempColName;
                isRenameColumn = true;
            }

            //Get columns from dtblLeft
            DataTable dtblResult = dtblLeft.Clone();

            //Get columns from dtblRight
            var dt2Columns = dtblRight.Columns.OfType<DataColumn>().Select(dc => new DataColumn(dc.ColumnName, dc.DataType, dc.Expression, dc.ColumnMapping));

            //Get columns from dtblRight that are not in dtblLeft
            var dt2FinalColumns = from dc in dt2Columns.AsEnumerable()
                                  where !dtblResult.Columns.Contains(dc.ColumnName)
                                  select dc;

            //Add the rest of the columns to dtblResult
            dtblResult.Columns.AddRange(dt2FinalColumns.ToArray());

            //No reason to continue if the colToJoinOn does not exist in both DataTables.
            if (!dtblLeft.Columns.Contains(LeftColumnToJoin) || !dtblRight.Columns.Contains(RightColumnToJoin) && !dtblRight.Columns.Contains(strTempColName))
            {
                return dtblResult;
            }

            switch (joinType)
            {
                case JoinType.Inner:

                    #region Inner

                    //get row data
                    //To use the DataTable.AsEnumerable() extension method you need to add a reference to the System.Data.DataSetExtension assembly in your project.
                    var rowDataLeftInner = (from rowLeft in dtblLeft.AsEnumerable()
                                            join rowRight in dtblRight.AsEnumerable() on rowLeft.Field<string>(LeftColumnToJoin) equals rowRight.Field<string>(strTempColName)
                                            select rowLeft.ItemArray.Concat(rowRight.ItemArray.ToArray()).ToArray()).Skip(0).Take(10);

                    //Add row data to dtblResult
                    foreach (object[] values in rowDataLeftInner)
                        dtblResult.Rows.Add(values);
                    #endregion Inner

                    break;

                case JoinType.Left:

                    #region Left

                    var rowDataLeftOuter = from rowLeft in dtblLeft.AsEnumerable()
                                           join rowRight in dtblRight.AsEnumerable() on rowLeft.Field<string>(RightColumnToJoin) equals rowRight.Field<string>(strTempColName) into gj
                                           from subRight in gj.DefaultIfEmpty()
                                           select rowLeft.ItemArray.Concat((subRight == null) ? (dtblRight.NewRow().ItemArray) : subRight.ItemArray).ToArray();

                    //Add row data to dtblResult
                    foreach (object[] values in rowDataLeftOuter)
                        dtblResult.Rows.Add(values);

                    #endregion Left

                    break;
            }

            if (isRenameColumn)
            {
                //Change column name back to original
                dtblRight.Columns[strTempColName].ColumnName = RightColumnToJoin;

                //Remove extra column from result
                dtblResult.Columns.Remove(strTempColName);
            }

            return dtblResult;
        }

        /// <summary>
        /// Joins the passed in DataTables on the colToJoinOn.
        /// <para>Returns an appropriate DataTable with zero rows if the colToJoinOn does not exist in both tables.</para>
        /// </summary>
        /// <param name="dtblLeft"></param>
        /// <param name="dtblRight"></param>
        /// <param name="LeftColumnToJoin"></param>
        /// <param name="RightColumnToJoin"></param>
        /// <param name="joinType"></param>
        /// <param name="Skip"></param>
        /// <param name="Take"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        /// <remarks>
        /// <para>http://stackoverflow.com/questions/2379747/create-combined-datatable-from-two-datatables-joined-with-linq-c-sharp?rq=1</para>
        /// <para>http://msdn.microsoft.com/en-us/library/vstudio/bb397895.aspx</para>
        /// <para>http://www.codinghorror.com/blog/2007/10/a-visual-explanation-of-sql-joins.html</para>
        /// <para>http://stackoverflow.com/questions/406294/left-join-and-left-outer-join-in-sql-server</para>
        /// </remarks>
        public static DataTable JoinTwoDataTablesOnOneColumn(DataTable dtblLeft, DataTable dtblRight, string LeftColumnToJoin, string RightColumnToJoin, JoinType joinType, int Skip, int Take, out int count)
        {
            //Change column name to a temp name so the LINQ for getting row data will work properly.
            string strTempColName = RightColumnToJoin;
            bool isRenameColumn = false;

            if (dtblRight.Columns.Contains(LeftColumnToJoin))
            {
                strTempColName = strTempColName + "_2";
                dtblRight.Columns[RightColumnToJoin].ColumnName = strTempColName;
                isRenameColumn = true;
            }

            //Get columns from dtblLeft
            DataTable dtblResult = dtblLeft.Clone();

            //Get columns from dtblRight
            var dt2Columns = dtblRight.Columns.OfType<DataColumn>().Select(dc => new DataColumn(dc.ColumnName, dc.DataType, dc.Expression, dc.ColumnMapping));

            //Get columns from dtblLeft
            var dtLeftColumns = dtblLeft.Columns.OfType<DataColumn>().Select(dc => new DataColumn(dc.ColumnName, dc.DataType, dc.Expression, dc.ColumnMapping));

            //Get columns from dtblLeft that are not in dtblRight
            var dtFinalColumns = from dc in dtLeftColumns.AsEnumerable()
                                 where dtblRight.Columns.Contains(dc.ColumnName)
                                 select dc;
            string ColumnName = string.Join(",", dtFinalColumns.Select(x => x.ColumnName).ToList());
            if (dtFinalColumns.Any())
            {
                throw new AdInsCustomException("Same Column Exists in Both Tables (" + ColumnName + "), Please Use Different Column Name", "999");
            }
            //Get columns from dtblRight that are not in dtblLeft
            var dt2FinalColumns = from dc in dt2Columns.AsEnumerable()
                                  where !dtblResult.Columns.Contains(dc.ColumnName)
                                  select dc;

            //Add the rest of the columns to dtblResult
            dtblResult.Columns.AddRange(dt2FinalColumns.ToArray());

            //No reason to continue if the colToJoinOn does not exist in both DataTables.
            if (!dtblLeft.Columns.Contains(LeftColumnToJoin) || !dtblRight.Columns.Contains(RightColumnToJoin) && !dtblRight.Columns.Contains(strTempColName))
            {
                count = 0;
                return dtblResult;
            }

            switch (joinType)
            {
                case JoinType.Inner:

                    #region Inner

                    //get row data
                    //To use the DataTable.AsEnumerable() extension method you need to add a reference to the System.Data.DataSetExtension assembly in your project.
                    var rowDataLeftInner = (from rowLeft in dtblLeft.AsEnumerable()
                                            join rowRight in dtblRight.AsEnumerable() on rowLeft.Field<string>(LeftColumnToJoin) equals rowRight.Field<string>(strTempColName)
                                            select rowLeft.ItemArray.Concat(rowRight.ItemArray.ToArray()).ToArray());
                    count = rowDataLeftInner.Count();
                    rowDataLeftInner = rowDataLeftInner.Skip(Skip).Take(Take);
                    //Add row data to dtblResult
                    foreach (object[] values in rowDataLeftInner)
                        dtblResult.Rows.Add(values);

                    #endregion Inner

                    break;

                case JoinType.Left:

                    #region Left

                    var rowDataLeftOuter = from rowLeft in dtblLeft.AsEnumerable()
                                           join rowRight in dtblRight.AsEnumerable() on rowLeft.Field<string>(RightColumnToJoin) equals rowRight.Field<string>(strTempColName) into gj
                                           from subRight in gj.DefaultIfEmpty()
                                           select rowLeft.ItemArray.Concat((subRight == null) ? (dtblRight.NewRow().ItemArray) : subRight.ItemArray).ToArray();

                    count = rowDataLeftOuter.Count();
                    rowDataLeftOuter = rowDataLeftOuter.Skip(Skip).Take(Take);
                    //Add row data to dtblResult
                    foreach (object[] values in rowDataLeftOuter)
                        dtblResult.Rows.Add(values);

                    #endregion Left

                    break;
                default:
                    count = 0;
                    break;
            }

            if (isRenameColumn)
            {
                //Change column name back to original
                dtblRight.Columns[strTempColName].ColumnName = RightColumnToJoin;

                //Remove extra column from result
                dtblResult.Columns.Remove(strTempColName);
            }

            return dtblResult;
        }

        /// <summary>
        /// Joins the passed in DataTables on the colToJoinOn.
        /// <para>Returns an appropriate DataTable with zero rows if the colToJoinOn does not exist in both tables.</para>
        /// </summary>
        /// <param name="dtblLeft"></param>
        /// <param name="dtblRight"></param>
        /// <param name="LeftColumnToJoin1"></param>
        /// <param name="RightColumnToJoin1"></param>
        /// <param name="LeftColumnToJoin2"></param>
        /// <param name="RightColumnToJoin2"></param>
        /// <param name="joinType"></param>
        /// <returns></returns>
        /// <remarks>
        /// <para>http://stackoverflow.com/questions/2379747/create-combined-datatable-from-two-datatables-joined-with-linq-c-sharp?rq=1</para>
        /// <para>http://msdn.microsoft.com/en-us/library/vstudio/bb397895.aspx</para>
        /// <para>http://www.codinghorror.com/blog/2007/10/a-visual-explanation-of-sql-joins.html</para>
        /// <para>http://stackoverflow.com/questions/406294/left-join-and-left-outer-join-in-sql-server</para>
        /// </remarks>
        public static DataTable JoinTwoDataTablesOnTwoColumn(DataTable dtblLeft, DataTable dtblRight, string LeftColumnToJoin1, string LeftColumnToJoin2, string RightColumnToJoin1, string RightColumnToJoin2, JoinType joinType)
        {
            //Change column name to a temp name so the LINQ for getting row data will work properly.
            string strTempColName = RightColumnToJoin1;
            string strTempColName2 = RightColumnToJoin2;
            bool isRenameColumn = false;

            if (dtblRight.Columns.Contains(LeftColumnToJoin1))
            {
                strTempColName += "_2";
                dtblRight.Columns[RightColumnToJoin1].ColumnName = strTempColName;
                isRenameColumn = true;
            }

            if (dtblRight.Columns.Contains(LeftColumnToJoin2))
            {
                strTempColName2 += "_2";
                dtblRight.Columns[RightColumnToJoin1].ColumnName = strTempColName2;
                isRenameColumn = true;
            }

            //Get columns from dtblLeft
            DataTable dtblResult = dtblLeft.Clone();

            //Get columns from dtblRight
            var dt2Columns = dtblRight.Columns.OfType<DataColumn>().Select(dc => new DataColumn(dc.ColumnName, dc.DataType, dc.Expression, dc.ColumnMapping));

            //Get columns from dtblRight that are not in dtblLeft
            var dt2FinalColumns = from dc in dt2Columns.AsEnumerable()
                                  where !dtblResult.Columns.Contains(dc.ColumnName)
                                  select dc;

            //Add the rest of the columns to dtblResult
            dtblResult.Columns.AddRange(dt2FinalColumns.ToArray());

            //No reason to continue if the colToJoinOn does not exist in both DataTables.
            if (!dtblLeft.Columns.Contains(LeftColumnToJoin1) || !dtblLeft.Columns.Contains(LeftColumnToJoin2) || !dtblRight.Columns.Contains(strTempColName) || !dtblRight.Columns.Contains(strTempColName2))
            {
                return dtblResult;
            }

            switch (joinType)
            {
                case JoinType.Inner:

                    #region Inner
                    //get row data
                    //To use the DataTable.AsEnumerable() extension method you need to add a reference to the System.Data.DataSetExtension assembly in your project.
                    var rowDataLeftInner = (from rowLeft in dtblLeft.AsEnumerable()
                                            join rowRight in dtblRight.AsEnumerable() on new { Col1 = rowLeft.Field<string>(LeftColumnToJoin1), Col2 = rowLeft.Field<string>(LeftColumnToJoin2) } equals new { Col1 = rowRight.Field<string>(strTempColName), Col2 = rowRight.Field<string>(strTempColName2) }
                                            select rowLeft.ItemArray.Concat(rowRight.ItemArray.ToArray()).ToArray());

                    //Add row data to dtblResult
                    foreach (object[] values in rowDataLeftInner)
                        dtblResult.Rows.Add(values);
                    #endregion Inner

                    break;

                case JoinType.Left:

                    #region Left

                    var rowDataLeftOuter = from rowLeft in dtblLeft.AsEnumerable()
                                           join rowRight in dtblRight.AsEnumerable() on new { Col1 = rowLeft.Field<string>(LeftColumnToJoin1), Col2 = rowLeft.Field<string>(LeftColumnToJoin2) } equals new { Col1 = rowRight.Field<string>(strTempColName), Col2 = rowRight.Field<string>(strTempColName2) } into gj
                                           from subRight in gj.DefaultIfEmpty()
                                           select rowLeft.ItemArray.Concat((subRight == null) ? (dtblRight.NewRow().ItemArray) : subRight.ItemArray).ToArray();

                    //Add row data to dtblResult
                    foreach (object[] values in rowDataLeftOuter)
                        dtblResult.Rows.Add(values);

                    #endregion Left

                    break;
            }

            if (isRenameColumn)
            {
                //Change column name back to original
                dtblRight.Columns[strTempColName].ColumnName = RightColumnToJoin1;
                dtblRight.Columns[strTempColName2].ColumnName = RightColumnToJoin2;

                //Remove extra column from result
                dtblResult.Columns.Remove(strTempColName);
                dtblResult.Columns.Remove(strTempColName2);
            }

            return dtblResult;
        }

        /// <summary>
        /// Merge Tables By Index
        /// </summary>
        /// <param name="t1"></param>
        /// <param name="t2"></param>
        /// <returns></returns>
        public static DataTable MergeTablesByIndex(DataTable t1, DataTable t2)
        {
            if (t1 == null || t2 == null) throw new ArgumentNullException("t1 or t2", "Both tables must not be null");

            DataTable t3 = t1.Clone();  // first add columns from table1
            foreach (DataColumn col in t2.Columns)
            {
                string newColumnName = col.ColumnName;
                int colNum = 1;
                while (t3.Columns.Contains(newColumnName))
                {
                    newColumnName = string.Format("{0}_{1}", col.ColumnName, ++colNum);
                }
                t3.Columns.Add(newColumnName, col.DataType);
            }
            var mergedRows = t1.AsEnumerable().Zip(
                t2.AsEnumerable(), (r1, r2) => r1.ItemArray.Concat(r2.ItemArray).ToArray());
            foreach (object[] rowFields in mergedRows)
                t3.Rows.Add(rowFields);

            return t3;
        }

        /// <summary>
        /// Join Two Data Tables On One Column V2
        /// </summary>
        /// <param name="dtblLeft"></param>
        /// <param name="dtblRight"></param>
        /// <param name="colToJoinOn"></param>
        /// <param name="joinType"></param>
        /// <returns></returns>
        public static DataTable JoinTwoDataTablesOnOneColumnV2(DataTable dtblLeft, DataTable dtblRight, string colToJoinOn, JoinType joinType)
        {
            //Change column name to a temp name so the LINQ for getting row data will work properly.

            //Get columns from dtblLeft
            DataTable dtblResult = dtblLeft.Clone();

            //Get columns from dtblRight
            var dt2Columns = dtblRight.Columns.OfType<DataColumn>().Select(dc => new DataColumn(dc.ColumnName, dc.DataType, dc.Expression, dc.ColumnMapping));

            //Get columns from dtblRight that are not in dtblLeft
            var dt2FinalColumns = from dc in dt2Columns.AsEnumerable()
                                  where !dtblResult.Columns.Contains(dc.ColumnName)
                                  select dc;

            //Add the rest of the columns to dtblResult
            dtblResult.Columns.AddRange(dt2FinalColumns.ToArray());
            //Remove extra column from result
            ////Change column name back to original

            dtblResult.Merge(dtblLeft, true, MissingSchemaAction.Ignore);
            dtblResult.Merge(dtblRight, true, MissingSchemaAction.Ignore);
            dtblLeft.Merge(dtblRight);

            ////Change column name back to original

            ////Remove extra column from result

            return dtblResult;
        }
    }
}