USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[JobFairs_Update_V2] ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
 -- Author: Jesus Torres
 -- Create date: 7/01/2022
 -- Description: UpdateV2 for creating JobFair w/Location
 -- Code Reviewer: Axl Nunez
 -- MODIFIED BY:
 -- MODIFIED DATE: MM/DD/YEAR
 -- Code Reviewer: 07/12/2022
 -- Note:
-- =============================================

 ALTER proc [dbo].[JobFairs_Update_V2]
			@Id int 
		   ,@JobFairTypeId int
       ,@Name nvarchar(255)
       ,@Summary nvarchar(255)
       ,@ShortDescription nvarchar(4000)
       ,@GroupId int
       ,@JobFairStatusId int
       ,@ImageUrl nvarchar(400)
       ,@ExternalSiteUrl nvarchar(400)
       ,@DateStart datetime2(7)
       ,@DateEnd datetime2(7)
		   ,@LocationTypeId int
		   ,@LineOne nvarchar(255)
		   ,@LineTwo nvarchar(255)
		   ,@City nvarchar(255)
		   ,@Zip  nvarchar(50)
		   ,@StateId int
		   ,@Latitude float
		   ,@Longitude float
		   ,@CreatedBy int
		   ,@ModifiedBy int
		   
AS
/* ---------TEST CODE---------

	Declare @Id int = 12
		   ,@JobFairTypeId int = 3
       ,@Name nvarchar(255) = 'New Veteran Job Fair!'
       ,@Summary nvarchar(255) = 'Do not Miss Upcoming Veteran Job Fair'
       ,@ShortDescription nvarchar(4000) ='Serving those who served for us.'
       ,@GroupId int = 1
       ,@JobFairStatusId int = 1
       ,@ImageUrl nvarchar(400) = 'http://tiny.cc/Annual-JF-Vet'
       ,@ExternalSiteUrl nvarchar(400) = 'va.gov'
       ,@DateStart datetime2(7) ='2022-08-15'
       ,@DateEnd datetime2(7) ='2022-08-30'
		   ,@LocationTypeId int = 3
		   ,@LineOne nvarchar(255) = 'Ardennes Road'
		   ,@LineTwo nvarchar(255) = 'Green Ramp'
	     ,@City nvarchar(255) = 'Fort Bragg'
		   ,@Zip nvarchar(50) = '45435'
		   ,@StateId int = 66
		   ,@Latitude float = 62.93873
		   ,@Longitude float = 72.76434
		   ,@CreatedBy int = 2
		   ,@ModifiedBy int = 2		     

	Execute [dbo].[JobFairs_Update_V2]
			 @Id 
			,@JobFairTypeId 
			,@Name 
			,@Summary 
			,@ShortDescription 
			,@GroupId 
			,@JobFairStatusId
			,@ImageUrl 
			,@ExternalSiteUrl 
			,@DateStart 
			,@DateEnd
			,@LocationTypeId
			,@LineOne
			,@LineTwo
			,@City
			,@Zip
			,@StateId
			,@Latitude
			,@Longitude
			,@CreatedBy
			,@ModifiedBy

	Execute dbo.JobFairs_SelectDetails_ById @Id	 		    

	Select * From dbo.JobFairs
	Select * From dbo.Locations
	where @Id=Id

 ---------TEST CODE---------*/
Begin
	
	Declare @DateCreated datetime2 = getutcdate()
	Declare @DateModified datetime2 = getutcdate()

	UPDATE [dbo].[Locations]
	  SET  [LocationTypeId] = @LocationTypeId
		  ,[LineOne] = @LineOne
		  ,[LineTwo] = @LineTwo
		  ,[City] = @City
		  ,[Zip] = @Zip
		  ,[StateId] = @StateId
		  ,[Latitude] = @Latitude
		  ,[Longitude] = @Longitude
		  ,[DateCreated] = @DateCreated
		  ,[DateModified] = @DateModified
		  ,[CreatedBy] = @CreatedBy
		  ,[ModifiedBy] = @ModifiedBy
	WHERE Id = (select LocationId
				from dbo.JobFairs as jf
				where jf.LocationId = @Id)

	UPDATE [dbo].[JobFairs]
	  SET  [JobFairTypeId] = @JobFairTypeId
		  ,[Name] = @Name
		  ,[Summary] = @Summary
		  ,[ShortDescription] = @ShortDescription
		  ,[GroupId] = @GroupId
		  ,[JobFairStatusId] = @JobFairStatusId
		  ,[ImageUrl] = @ImageUrl
		  ,[ExternalSiteUrl] = @ExternalSiteUrl
		  ,[DateCreated] = @DateCreated
		  ,[DateModified] = @DateModified
		  ,[DateStart] = @DateStart
		  ,[DateEnd] = @DateEnd
	WHERE @Id = Id

END

