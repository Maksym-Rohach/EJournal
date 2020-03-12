using EJournal.Data.Entities.AppUeser;

namespace EJournal.Data.Entities
{
    public class Teacher
    {
        public string Id { get; set; }
        public string Degree { get; set; }

        public DbUser User { get; set; }
    }
}
