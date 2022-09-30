USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[JobFairs_Insert_V3] *****/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER proc [dbo].[JobFairs_Insert_V3]		
		    @JobFairTypeId int
       ,@Name nvarchar(255)
       ,@Summary nvarchar(255)
       ,@ShortDescription nvarchar(4000)
		   ,@GroupTypeId int
		   ,@GroupName nvarchar(200)
		   ,@Headline nvarchar(200)
		   ,@Description nvarchar(MAX)
		   ,@Logo nvarchar(255)
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
		   ,@Id int OUTPUT
AS
/* ---------TEST CODE---------

	Declare @JobFairTypeId int = 2
         ,@Name nvarchar(255) = 'Upcoming Job Fair!'
         ,@Summary nvarchar(255) = 'Upcoming New Job Fair'
         ,@ShortDescription nvarchar(4000) ='Helping people start new jobs.'
	       ,@GroupTypeId int = 1
  		   ,@Name nvarchar(200) = 'Test Organization'
		     ,@Headline nvarchar(200) = 'We are the organization'
		     ,@Description nvarchar(max) = 'We help people help people'
	       ,@Logo nvarchar(200) ='Help People Help Themselves'		
		     ,@JobFairStatusId int = 1
         ,@ImageUrl nvarchar(400) = 'http://tiny.cc/Annual-JF-Vet'
         ,@ExternalSiteUrl nvarchar(400) = 'google.com'
         ,@DateStart datetime2(7) ='2022-08-15'
         ,@DateEnd datetime2(7) ='2022-08-30'
		     ,@LocationTypeId int = 3
         ,@LineOne nvarchar(255) = 'Ardennes Road'
         ,@LineTwo nvarchar(255) = 'Airborne Px'
         ,@City nvarchar(255) = 'Barstow'
         ,@Zip nvarchar(50) = '92311'
         ,@StateId int = 8
         ,@Latitude float = 62.93873
         ,@Longitude float = 72.76434
         ,@CreatedBy int = 2
         ,@ModifiedBy int = 2		
         ,@Id int =0


	Execute [dbo].[JobFairs_Insert_V3]			
			@JobFairTypeId 
			,@Name 
			,@Summary 
			,@ShortDescription 
			,@GroupTypeId int
      ,@GroupName nvarchar(200)
      ,@Headline nvarchar(200)
      ,@Description nvarchar(MAX)
      ,@Logo nvarchar(255)			
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
			,@Id OUTPUT
		 		    
	Select * From dbo.JobFairs
	where @Id = Id

	Execute dbo.JobFairs_SelectDetails_ById @Id			
		
Select * From dbo.Locations
 ---------TEST CODE---------*/
Begin
	
	Declare @LocationId int = 0
	INSERT INTO [dbo].[Locations]
		([LocationTypeId]
		,[LineOne]
		,[LineTwo]
		,[City]
		,[Zip]
		,[StateId]
		,[Latitude]
		,[Longitude]
		,[CreatedBy]
		,[ModifiedBy])
	VALUES
		(@LocationTypeId
		,@LineOne
	 	,@LineTwo
		,@City
		,@Zip
		,@StateId
		,@Latitude
		,@Longitude
		,@CreatedBy
		,@ModifiedBy)
	SET @LocationId = SCOPE_IDENTITY()

	Declare @GroupId int = 0
	  INSERT INTO [dbo].[Groups]
        ([GroupTypeId]
        ,[Name]
        ,[Headline]
        ,[Description]
        ,[Logo])

    VALUES
        (@GroupTypeId 
        ,@Name
        ,@Headline
        ,@Description
        ,@Logo) 

	SET @GroupId = SCOPE_IDENTITY()

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
    ,@DateStart 
    ,@DateEnd
		)

	Set @Id = SCOPE_IDENTITY()

END

