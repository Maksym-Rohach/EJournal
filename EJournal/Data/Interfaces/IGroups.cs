using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Interfaces
{
    public interface IGroups
    {
        List<GetGroupShortModel> GetGroupsBySpeciality(int specialityId);
        List<GetGroupInfoModel> GetGroupInfoBySpeciality(int specialityId);

    }
}
