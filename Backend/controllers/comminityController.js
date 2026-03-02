import comunityPosts from "../model/communityModel.js";

export const deleteCommunityPost = async (req,res)=>{
    try{
        const {postId} = req.params;
        const deletedPost = await comunityPosts.findByIdAndDelete(postId);
        if(!deletedPost){
            return res.status(404).json({message : "Community post not found"})
        }
        return res.status(200).json({message : "Community post deleted successfully", deletedPost})
    }
    catch(err){
        return res.status(400).json({message : `deleteCommunityPost error in communityController : ${err}`})
    }
}