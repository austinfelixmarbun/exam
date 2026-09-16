namespace AdIns.Template.DTO.GenericObj
{
    public class KeyAndValueObj
    {
        public KeyAndValueObj()
        {

        }

        public KeyAndValueObj(string key, OperatorSelection operand, object value)
        {
            this.Key = key;
            this.Value = value;
            this.Operator = operand.ToString();
        }


        public string Key { get; set; }
        public string Operator { get; set; } = "EQ";
        public object Value { get; set; }

        public enum OperatorSelection
        {
            EQ,
            NEQ,
            LIKE,
            IN,
            GTE,
            LTE,
            GT,
            LT,
            NOTIN
        }
    }
}