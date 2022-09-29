using Sabio.Models;
using Sabio.Models.Domain.JobFair;
using Sabio.Models.Requests.JobFair;

namespace Sabio.Services
{
    public interface IJobFairService
    {
        int AddJobFair(JobFairAddRequest model, int userId);
        JobFair GetJobFairById(int Id);
        Paged<JobFair> GetAllJobFairPaginated(int pageIndex, int pageSize);
        Paged<JobFair> GetCurrentUserId(int pageIndex, int pageSize, int userId);
        Paged<JobFair> SearchJobFair(int pageIndex, int pageSize, string query);
        Paged<JobFairSearchResult> SearchJobFairPaginationLocation(int pageIndex, int pageSize, string query, double latParam, double longParam, int distance);
        void UpdateJobFair(JobFairUpdateRequest model, int userId);
        void DeleteJobFair(int Id);
    }
}
