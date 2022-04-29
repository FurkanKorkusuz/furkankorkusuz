using Business.Abstract;
using Core.Utilities.Business;
using DataAccess.Abstract;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete.Managers
{
       public class NoteBookManager : BaseEntityManager<NoteBook>, INoteBookService
    {
        INoteBookDal _NoteBookDal;
        public NoteBookManager(INoteBookDal dal) : base(dal)
        {
            _NoteBookDal = dal;
        }

    }
}
