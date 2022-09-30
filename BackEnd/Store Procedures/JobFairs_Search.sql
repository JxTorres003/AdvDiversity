USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[JobFairs_Search] ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Jesus Torres
-- Create date: 7/01/2022
-- Description: Seach for dbo.JobFairs
--	-Paginated and inner join w/ JobFairType, Locations, JobFairStatus

-- Code Reviewer: Axl Nunez
-- MODIFIED BY: author
-- MODIFIED DATE: MM/DD/YEAR
-- Code Reviewer: 08/12/2022
-- Note:
-- =============================================

 ALTER proc [dbo].[JobFairs_Search]
			    @PageIndex int 
		     ,@PageSize int
		     ,@Query nvarchar(50)

AS

/*---------TEST CODE---------

	DECLARE	  @Query nvarchar(50) = 'summer'
			 ,@PageIndex int = 0
			 ,@PageSize int = 30;

    EXECUTE [dbo].[JobFairs_Search]
			  @PageIndex
			 ,@PageSize
			 ,@Query

	SELECT * from dbo.JobFairs

*/---------TEST CODE---------

BEGIN
	DECLARE @offset int = @pageIndex * @pageSize

		SELECT jf.[Id]		
			  ,jft.[Id] as JobFairTypeId
			  ,jft.[Type] as JobFairType
			  ,jf.[Name] as JobFair
			  ,jf.[Summary]
			  ,jf.[ShortDescription]
			  ,grp.[Id] as GroupId
			  ,gtyp.[Id] as GroupTypeId
			  ,gtyp.[Name] as GroupType
			  ,grp.[Name] as Groups
			  ,grp.[Logo]
			  ,grp.[Headline]
			  ,grp.[Description]
			  ,loc.[Id] as LocationId
			  ,loct.[Id] as LocationTypeId
			  ,loct.[Name] as LocationType
			  ,loc.[LineOne]
			  ,loc.[LineTwo]
			  ,loc.[City]
			  ,loc.[Zip]
			  ,st.[Id] as StateId
			  ,st.[Name] as State
			  ,loc.[Latitude]
			  ,loc.[Longitude]
			  ,jfs.[Id] as JobFairStatusId
			  ,jfs.[Name] as JobFairStatus
			  ,jf.[ImageUrl]
			  ,jf.[ExternalSiteUrl]
			  ,jf.[DateCreated]
			  ,jf.[DateModified]
			  ,jf.[DateStart]
			  ,jf.[DateEnd]
			  ,TotalCount = COUNT(1) OVER()
	  FROM [dbo].[JobFairs] as jf 
			left join [dbo].[JobFairTypes] as jft
		ON jf.JobFairTypeId = jft.Id
			left join [dbo].[Groups] as grp
		ON jf.GroupId = grp.Id
			left join [dbo].[GroupTypes] as gtyp
		ON grp.GroupTypeId = gtyp.Id
			left join [dbo].[Locations] as loc
		ON jf.LocationId = loc.Id
			left join [dbo].[LocationTypes] as loct
		ON loc.LocationTypeId = loct.Id
			left join [dbo].[States] as st
		ON loc.StateId = st.Id
			left join [dbo].[JobFairStatus] as jfs
		ON jf.JobFairStatusId = jfs.Id

	WHERE (
		jf.Name LIKE '%' + @Query + '%' OR
		jft.Type LIKE '%' + @Query + '%' OR
		gtyp.Name LIKE '%' + @Query + '%' OR
		grp.Name LIKE '%' + @Query + '%' OR
		loct.Name LIKE '%' + @Query + '%' OR
		loc.City LIKE '%' + @Query + '%' OR
		loc.Zip LIKE '%' + @Query + '%' OR
		st.Name LIKE '%' + @Query + '%' OR
		jf.DateStart LIKE '%' + @Query + '%'
		)

	ORDER BY jf.Id
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

END