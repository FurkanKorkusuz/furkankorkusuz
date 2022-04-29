using Business.Abstract;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete.Managers
{
   
        public class ProjectManager : BaseEntityManager<Project>, IProjectService
        {
        IProjectDal _projectDal;
            public ProjectManager(IProjectDal dal) : base(dal)
            {
                 _projectDal = dal;
            }

    }
    
}
