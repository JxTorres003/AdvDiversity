USE [AdvDiversity]
GO
/****** Object: StoredProcedure [dbo].[JobFairs_Update] *******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
 -- Author: Jesus Torres
 -- Create date: 7/01/2022
 -- Description: Update for JobFair
 -- Code Reviewer:
 -- MODIFIED BY: author
 -- MODIFIED DATE: MM/DD/YEAR
 -- Code Reviewer: MM/DD/YEAR
 -- Note:
-- =============================================

 ALTER proc [dbo].[JobFairs_Update]
		    @JobFairTypeId int
           ,@Name nvarchar(255)
           ,@Summary nvarchar(255)
           ,@ShortDescription nvarchar(4000)
           ,@GroupId int
           ,@LocationId int
           ,@JobFairStatusId int
           ,@ImageUrl nvarchar(400)
           ,@ExternalSiteUrl nvarchar(400)
           ,@DateCreated datetime2(7)
           ,@DateStart datetime2(7)
           ,@DateEnd datetime2(7)
		   ,@Id int 		   

AS
/* ---------TEST CODE---------
	
	Declare @JobFairTypeId int = 3
           ,@Name nvarchar(255) = 'New Vet Job Fair!'
           ,@Summary nvarchar(255) = 'Dont Miss! Upcoming Veteran Job Fair!'
           ,@ShortDescription nvarchar(4000) = 'Helping veteran start new jobs.'
           ,@GroupId int = 1
           ,@LocationId int = 69
           ,@JobFairStatusId int = 1
           ,@ImageUrl nvarchar(400) = 'http://tiny.cc/Annual-JF-Vet'
           ,@ExternalSiteUrl nvarchar(400) = 'va.gov'
		       ,@DateCreated datetime2(7) = '2022-07-01'
           ,@DateStart datetime2(7) = '2022-08-15'
           ,@DateEnd datetime2(7) = '2022-08-30'
		       ,@Id int = 8		   

	Execute [dbo].[JobFair_Update]
            @JobFairTypeId 
          ,@Name 
          ,@Summary 
          ,@ShortDescription 
          ,@GroupId 
          ,@LocationId 
          ,@JobFairStatusId
          ,@ImageUrl 
          ,@ExternalSiteUrl 
          ,@DateCreated 
          ,@DateStart 
          ,@DateEnd
          ,@Id

	Select * From dbo.JobFair
	Where @Id=Id

 ---------TEST CODE---------*/
Begin

	Declare @DateModified datetime2 = getutcdate()

	UPDATE [dbo].[JobFairs]
	   SET [JobFairTypeId] = @JobFairTypeId
		  ,[Name] = @Name
		  ,[Summary] = @Summary
		  ,[ShortDescription] = @ShortDescription
		  ,[GroupId] = @GroupId
		  ,[LocationId] = @LocationId
		  ,[JobFairStatusId] = @JobFairStatusId
		  ,[ImageUrl] = @ImageUrl
		  ,[ExternalSiteUrl] = @ExternalSiteUrl
		  ,[DateCreated] = @DateCreated
		  ,[DateModified] = @DateModified
		  ,[DateStart] = @DateStart
		  ,[DateEnd] = @DateEnd
	WHERE @Id = Id

END

