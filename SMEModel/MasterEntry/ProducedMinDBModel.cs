using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMEModel.MasterEntry
{
    public class ProducedMinDBModel
    {
        public int SL { get; set; }

        public int? Year { get; set; }

        public int? MonthSL { get; set; }

        public string Month { get; set; }

        public string Factory { get; set; }

        public string UnitId { get; set; }
        public string Unit { get; set; }

        public string UOM { get; set; }

        public decimal? PlannedMinutes { get; set; }

        public decimal? AchievedMinutes { get; set; }

        public decimal? AchievedPercentage { get; set; }
    }
}
