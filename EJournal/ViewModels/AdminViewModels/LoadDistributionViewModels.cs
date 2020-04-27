using EJournal.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.AdminViewModels
{
    public class FiltersModel
    {
        public int GroupId { get; set; }
    }
    public class GetSubjectViewModel
    {
        public string Group { get; set; }
        public List<SubjectsModel> Subjects { get; set; }        
    }
    public class TeacherModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
    public class SubjectsModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<TeacherModel> Teachers { get; set; }
    }
}
