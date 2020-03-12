using EJournal.Data.Entities.AppUeser;

namespace EJournal.Data.Entities
{
    public class Student
    {
        public string Id { get; set; }

        public DbUser User { get; set; }
    }
}
