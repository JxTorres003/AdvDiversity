USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[JobFairs_Insert] ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
 -- Author: Jesus Torres
 -- Create date: 7/01/2022
 -- Description: Insert for creating JobFair

 -- Code Reviewer:
 -- MODIFIED BY: author
 -- MODIFIED DATE: MM/DD/YEAR
 -- Code Reviewer: MM/DD/YEAR
 -- Note:
-- =============================================

 ALTER proc [dbo].[JobFairs_Insert]
			  @Id int OUTPUT
		   ,@JobFairTypeId int
       ,@Name nvarchar(255)
       ,@Summary nvarchar(255)
       ,@ShortDescription nvarchar(4000)
       ,@GroupId int
       ,@LocationId int
       ,@JobFairStatusId int
       ,@ImageUrl nvarchar(400)
       ,@ExternalSiteUrl nvarchar(400)
       ,@DateStart datetime2(7)
       ,@DateEnd datetime2(7)
AS
/* ---------TEST CODE---------	
	Declare @Id int = 0
	       ,@JobFairTypeId int = 3
         ,@Name nvarchar(255) = 'Veteran Job Fair!'
         ,@Summary nvarchar(255) = 'Upcoming Veteran Job Fair'
         ,@ShortDescription nvarchar(4000) ='Helping veteran start new jobs.'
         ,@GroupId int = 1
         ,@LocationId int = 82
         ,@JobFairStatusId int = 1
         ,@ImageUrl nvarchar(400) = 'http://tiny.cc/Annual-JF-Vet'
         ,@ExternalSiteUrl nvarchar(400) = 'va.gov'
         ,@DateStart datetime2(7) ='2022-08-15'
         ,@DateEnd datetime2(7) ='2022-08-30'		   

	Execute [dbo].[JobFairs_Insert]
         @Id OUTPUT
        ,@JobFairTypeId 
        ,@Name 
        ,@Summary 
        ,@ShortDescription 
        ,@GroupId 
        ,@LocationId 
        ,@JobFairStatusId
        ,@ImageUrl 
        ,@ExternalSiteUrl 
        ,@DateStart 
        ,@DateEnd
 		    

	Select * From dbo.JobFairs
	Where @Id=Id


 ---------TEST CODE---------*/
Begin

	Declare @DateCreated datetime2 = getutcdate()
	Declare @DateModified datetime2 = getutcdate()

	INSERT INTO [dbo].[JobFairs]
		([JobFairTypeId]
		,[Name]
		,[Summary]
		,[ShortDescription]
		,[GroupId]
		,[LocationId]
		,[JobFairStatusId]
		,[ImageUrl]
		,[ExternalSiteUrl]
		,[DateCreated]
		,[DateModified]
		,[DateStart]
		,[DateEnd])

     VALUES
		(
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
		,@DateModified
    ,@DateStart 
    ,@DateEnd
		)

	Set @Id = SCOPE_IDENTITY()

END

