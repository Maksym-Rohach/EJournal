namespace EJournal.Data.Entities
{
    public class JournalColumn
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public int LessonId { get; set; }
        public virtual Lesson Lesson { get; set; }

        public int JournalId { get; set; }
        public Journal Journal { get; set; }
    }
}
