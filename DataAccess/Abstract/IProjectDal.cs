using Core.DataAccess;
using Core.DataAccess.Abstract;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{

    public interface IProjectDal : IEntityRepository<Project>
    {
        Project GetByUrlName(string urlName);
        void UpdateImage(int id, string image);
    }

}
