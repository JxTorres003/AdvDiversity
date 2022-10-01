USE [AdvDiversity]
GO
/****** Object: StoredProcedure [dbo].[JobFairs_Delete_ById] ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
 -- Author: Jesus Torres
 -- Create date: 7/01/2022
 -- Description: -Delete by Id for dbo.JobFair
 --		 -also updates JobFairStatus @Name to Inactive
 -- Code Reviewer:
 -- MODIFIED BY: author
 -- MODIFIED DATE: MM/DD/YEAR
 -- Code Reviewer: MM/DD/YEAR
 -- Note:
-- =============================================

 ALTER proc [dbo].[JobFairs_Delete_ById] 
			 @Id int

AS
/* ----TEST CODE----

	DECLARE @Id int = 1
	EXECUTE [dbo].[JobFair_Delete_ById] 

	SELECT * 
	FROM dbo.JobFair	

 ----END TEST CODE---- */
BEGIN

	UPDATE dbo.JobFairStatus
	SET [Name] = 'Inactive' 

	Delete
	From dbo.JobFairs
   
	WHERE @Id = Id

END



