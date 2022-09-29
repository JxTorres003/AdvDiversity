using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.JobFair
{
    public class JobFairUpdateRequest : JobFairAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}