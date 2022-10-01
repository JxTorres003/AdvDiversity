USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[JobFairs_SelectDetails_ById] ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
 -- Author: Jesus Torres
 -- Create date: 7/01/2022
 -- Description: -Select details by Id for dbo.JobFair 
 --	  -also inner join w/JobFairType, Locations, JobFairStatus
 -- Code Reviewer: Axl Nunez
 -- MODIFIED BY: author
 -- MODIFIED DATE: MM/DD/YEAR
 -- Code Reviewer: 07/12/2022
 -- Note:
-- =============================================

 ALTER proc [dbo].[JobFairs_SelectDetails_ById]
				@Id int					

AS
/* ----TEST CODE----

	Declare @Id int = 11

	Execute dbo.JobFairs_SelectDetails_ById @Id								

 ----END TEST CODE---- */
Begin

		SELECT jf.[Id]		
			  ,jft.[Id] as JobFairTypeId
			  ,jft.[Type] as JobFairType
			  ,jf.[Name] as Name
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
			inner join [dbo].[JobFairTypes] as jft
		ON jf.JobFairTypeId = jft.Id 
			inner join [dbo].[Groups] as grp
		ON jf.GroupId = grp.Id 
			inner join [dbo].[GroupTypes] as gtyp
		ON grp.GroupTypeId = gtyp.Id 
			inner join [dbo].[Locations] as loc
		ON jf.LocationId = loc.Id 
			inner join [dbo].[LocationTypes] as loct
		ON loc.LocationTypeId = loct.Id 
			inner join [dbo].[States] as st
		ON loc.StateId = st.Id 
			inner join [dbo].[JobFairStatus] as jfs
		ON jf.JobFairStatusId = jfs.Id
	 Where jf.Id = @Id;

 END
 