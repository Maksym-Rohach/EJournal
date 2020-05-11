using Bogus.DataSets;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.TeacherViewModels
{
    public class GetExamViewModel
    {
        public List<ExamRowModel> rows { get; set; }
    }

    public class ExamRowModel
    {
        public string GroupName { get; set; }
        public string Subject { get; set; }
        public string DateOfExam { get; set; }
        public string LessonId { get; set; }
    } 

    public class GetDataViewModel
    {
        public List<StudentModel> Students { get; set; }
    }

    public class StudentModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
    }

    public class ChangeExamMarkViewModel
    {
        public string lessonId { get; set; }
        public string Mark { get; set; }
        public string StudentId { get; set; }
    }
}
