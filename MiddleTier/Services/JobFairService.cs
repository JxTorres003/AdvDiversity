using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.JobFair;
using Sabio.Models.Domain.Location;
using Sabio.Models.Requests.JobFair;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;


namespace Sabio.Services
{
    public class JobFairService : IJobFairService
    {
        IDataProvider _data = null;
        public JobFairService(IDataProvider data)
        {
            _data = data;
        }

        public int AddJobFair(JobFairAddRequest model, int userId)
        {
            string procName = "[dbo].[JobFairs_Insert_V2]";
            int id = 0;
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);
                SqlParameter idOut = new SqlParameter("@id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oldId = returnCollection["@id"].Value;
                int.TryParse(oldId.ToString(), out id);
            });
            return id;
        }

        public Paged<JobFair> GetAllJobFairPaginated(int pageIndex, int pageSize)
        {
            Paged<JobFair> pagedResult = null;
            List<JobFair> result = null;
            int totalCount = 0;
            string procName = "[dbo].[JobFairs_SelectAllDetails]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                JobFair jobFair = MapJobFair(reader, ref startingIndex);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (result == null)
                {
                    result = new List<JobFair>();
                }
                result.Add(jobFair);
            });
            if (result != null)
            {
                pagedResult = new Paged<JobFair>(result, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        public JobFair GetJobFairById(int id)
        {
            string procName = "[dbo].[JobFairs_SelectDetails_ById]";
            JobFair aJobFair = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startidx = 0;
                aJobFair = MapJobFair(reader, ref startidx);
            });
            return aJobFair;
        }

        public Paged<JobFair> GetCurrentUserId(int pageIndex, int pageSize, int userId)
        {
            Paged<JobFair> pagedList = null;
            List<JobFair> list = null;
            int totalCount = 0;
            string procName = "[dbo].[JobFairs_SelectDetails_ByCreatedBy]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@PageIndex", pageIndex);
                paramCollection.AddWithValue("@PageSize", pageSize);
                paramCollection.AddWithValue("@CreatedBy", userId);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                JobFair jobfairs = MapJobFair(reader, ref startingIndex);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (list == null)
                {
                    list = new List<JobFair>();
                }
                list.Add(jobfairs);
            });
            if (list != null)
            {
                pagedList = new Paged<JobFair>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<JobFair> SearchJobFair(int pageIndex, int pageSize, string query)
        {
            Paged<JobFair> pagedList = null;
            List<JobFair> list = null;
            int totalCount = 0;

            string procName = "[dbo].[JobFairs_Search]";

            _data.ExecuteCmd(procName, (SqlParameterCollection inputParams) =>
            {
                inputParams.AddWithValue("@PageIndex", pageIndex);
                inputParams.AddWithValue("@PageSize", pageSize);
                inputParams.AddWithValue("@Query", query);
            },
            (IDataReader reader, short set) =>
            {
                int startingIndex = 0;

                JobFair jobfair = MapJobFair(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (list == null)
                {
                    list = new List<JobFair>();
                }
                list.Add(jobfair);
            });
            if (list != null)
            {
                pagedList = new Paged<JobFair>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<JobFairSearchResult> SearchJobFairPaginationLocation(int pageIndex, int pageSize, string query, double latParam, double longParam, int distance)
        {
            Paged<JobFairSearchResult> pagedList = null;
            List<JobFairSearchResult> list = null;
            int totalCount = 0;

            string procName = "[dbo].[JobFairs_Search_Pagination_Location_Radius]";

            _data.ExecuteCmd(procName, (SqlParameterCollection inputParams) =>
            {
                inputParams.AddWithValue("@PageIndex", pageIndex);
                inputParams.AddWithValue("@PageSize", pageSize);
                inputParams.AddWithValue("@Query", query);
                inputParams.AddWithValue("@Lat", latParam);
                inputParams.AddWithValue("@Long", longParam);
                inputParams.AddWithValue("@Distance", distance);

            },
            (IDataReader reader, short set) =>
            {
                int startingIndex = 0;

                JobFairSearchResult jobfair = MapJobFairSearch(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (list == null)
                {
                    list = new List<JobFairSearchResult>();
                }
                list.Add(jobfair);
            });
            if (list != null)
            {
                pagedList = new Paged<JobFairSearchResult>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public void UpdateJobFair(JobFairUpdateRequest model, int userId)
        {
            string procName = "[dbo].[JobFairs_Update_V2]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);
                col.AddWithValue("@Id", model.Id);
            },
            returnParameters: null);
        }
        public void DeleteJobFair(int id)
        {
            string procName = "[dbo].[JobFairs_Delete_ById]";
            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            });
        }

        private JobFairSearchResult MapJobFairSearch(IDataReader reader, ref int startingIndex)
        {
            JobFairSearchResult aJF = new JobFairSearchResult();
            aJF.Id = reader.GetSafeInt32(startingIndex++);
            aJF.JobFairType = new LookUp()
            {
                Id = reader.GetSafeInt32(startingIndex++),
                Name = reader.GetSafeString(startingIndex++),
            };
            aJF.Name = reader.GetSafeString(startingIndex++);
            aJF.Summary = reader.GetSafeString(startingIndex++);
            aJF.ShortDescription = reader.GetSafeString(startingIndex++);
            Group grp = new Group();
            grp.Id = reader.GetSafeInt32(startingIndex++);
            grp.GroupType = new LookUp()
            {
                Id = reader.GetSafeInt32(startingIndex++),
                Name = reader.GetSafeString(startingIndex++),
            };
            grp.Name = reader.GetSafeString(startingIndex++);
            grp.Headline = reader.GetSafeString(startingIndex++);
            grp.Description = reader.GetSafeString(startingIndex++);
            grp.Logo = reader.GetSafeString(startingIndex++);
            aJF.Group = grp;
            LocationData loc = new LocationData();
            loc.Id = reader.GetSafeInt32(startingIndex++);
            loc.LocationType = new LookUp()
            {
                Id = reader.GetSafeInt32(startingIndex++),
                Name = reader.GetSafeString(startingIndex++),
            };
            loc.LineOne = reader.GetSafeString(startingIndex++);
            loc.LineTwo = reader.GetSafeString(startingIndex++);
            loc.City = reader.GetSafeString(startingIndex++);
            loc.Zip = reader.GetSafeString(startingIndex++);
            loc.State = new LookUp()
            {
                Id = reader.GetSafeInt32(startingIndex++),
                Name = reader.GetSafeString(startingIndex++),
            };
            loc.Latitude = reader.GetSafeDouble(startingIndex++);
            loc.Longitude = reader.GetSafeDouble(startingIndex++);
            aJF.Location = loc;
            aJF.JobFairStatus = new LookUp()
            {
                Id = reader.GetSafeInt32(startingIndex++),
                Name = reader.GetSafeString(startingIndex++),
            };
            aJF.ImageUrl = reader.GetSafeString(startingIndex++);
            aJF.ExternalSiteUrl = reader.GetSafeString(startingIndex++);
            aJF.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aJF.DateModified = reader.GetSafeDateTime(startingIndex++);
            aJF.DateStart = reader.GetSafeDateTime(startingIndex++);
            aJF.DateEnd = reader.GetSafeDateTime(startingIndex++);
            aJF.Distance = reader.GetSafeInt32(startingIndex++);

            return aJF;
        }

        private JobFair MapJobFair(IDataReader reader, ref int startingIndex)
        {
            JobFair aJF = new JobFair();
            aJF.Id = reader.GetSafeInt32(startingIndex++);
            aJF.JobFairType = new LookUp()
            {
                Id = reader.GetSafeInt32(startingIndex++),
                Name = reader.GetSafeString(startingIndex++),
            };
            aJF.Name = reader.GetSafeString(startingIndex++);
            aJF.Summary = reader.GetSafeString(startingIndex++);
            aJF.ShortDescription = reader.GetSafeString(startingIndex++);
            Group grp = new Group();
            grp.Id = reader.GetSafeInt32(startingIndex++);
            grp.GroupType = new LookUp()
            {
                Id = reader.GetSafeInt32(startingIndex++),
                Name = reader.GetSafeString(startingIndex++),
            };
            grp.Name = reader.GetSafeString(startingIndex++);
            grp.Headline = reader.GetSafeString(startingIndex++);
            grp.Description = reader.GetSafeString(startingIndex++);
            grp.Logo = reader.GetSafeString(startingIndex++);
            aJF.Group = grp;
            LocationData loc = new LocationData();
            loc.Id = reader.GetSafeInt32(startingIndex++);
            loc.LocationType = new LookUp()
            {
                Id = reader.GetSafeInt32(startingIndex++),
                Name = reader.GetSafeString(startingIndex++),
            };
            loc.LineOne = reader.GetSafeString(startingIndex++);
            loc.LineTwo = reader.GetSafeString(startingIndex++);
            loc.City = reader.GetSafeString(startingIndex++);
            loc.Zip = reader.GetSafeString(startingIndex++);
            loc.State = new LookUp()
            {
                Id = reader.GetSafeInt32(startingIndex++),
                Name = reader.GetSafeString(startingIndex++),
            };
            loc.Latitude = reader.GetSafeDouble(startingIndex++);
            loc.Longitude = reader.GetSafeDouble(startingIndex++);
            aJF.Location = loc;
            aJF.JobFairStatus = new LookUp()
            {
                Id = reader.GetSafeInt32(startingIndex++),
                Name = reader.GetSafeString(startingIndex++),
            };
            aJF.ImageUrl = reader.GetSafeString(startingIndex++);
            aJF.ExternalSiteUrl = reader.GetSafeString(startingIndex++);
            aJF.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aJF.DateModified = reader.GetSafeDateTime(startingIndex++);
            aJF.DateStart = reader.GetSafeDateTime(startingIndex++);
            aJF.DateEnd = reader.GetSafeDateTime(startingIndex++);

            return aJF;
        }

        private static void AddCommonParams(JobFairAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@JobFairTypeId", model.JobFairTypeId);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Summary", model.Summary);
            col.AddWithValue("@ShortDescription", model.ShortDescription);
            col.AddWithValue("@GroupId", model.GroupId);
            col.AddWithValue("@LocationTypeId", model.Location.LocationTypeId);
            col.AddWithValue("@LineOne", model.Location.LineOne);
            col.AddWithValue("@LineTwo", model.Location.LineTwo);
            col.AddWithValue("@City", model.Location.City);
            col.AddWithValue("@Zip", model.Location.Zip);
            col.AddWithValue("@StateId", model.Location.StateId);
            col.AddWithValue("@Latitude", model.Location.Latitude);
            col.AddWithValue("@Longitude", model.Location.Longitude);
            col.AddWithValue("@JobFairStatusId", model.JobFairStatusId);
            col.AddWithValue("@CreatedBy", userId);
            col.AddWithValue("@ModifiedBy", userId);
            col.AddWithValue("@ImageUrl", model.ImageUrl);
            col.AddWithValue("@ExternalSiteUrl", model.ExternalSiteUrl);
            col.AddWithValue("@DateStart", model.DateStart);
            col.AddWithValue("@DateEnd", model.DateEnd);
        }
    }
}

