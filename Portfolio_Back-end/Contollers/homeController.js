const Home = require('../Models/HomeModel')

const getHomeContent = async (req, res) => {
    try {
        const homeContent = await Home.find()
        if (!homeContent) {
            res.status(404).json({
                message: "Home Content not found"
            });
        }
        res.status(200).json({
            data: homeContent
        })
    }
    catch (err) {
        res.json(err.message)
    }
}

const addHomeContent = async (req, res) => {
    try {
        const {
            logo,
            title,
            subTitle,
            description,
            linkdin,
            github,
            instagram,
            facebook
        } = req.body;
        const cv = req.files?.cv?.[0].filename;
        const profileImg = req.files?.profileImg?.[0].filename;
        const content = new Home({
            logo,
            title,
            subTitle,
            description,
            profileImg,
            cv,
            linkdin,
            github,
            instagram,
            facebook
        })
        await content.save();
        res.status(200).json({
            message: 'Home content add succssefuly',
            data:content
        })
    } catch (err) {
        console.log(err);
        
        res.json({error:err.message})
    }
}

const editHomeContent = async (req, res) => {
    try {
        const updates = req.body;
        updates.cv = req.files?.cv?.[0].filename;
        updates.profileImg= req.files?.profileImg?.[0].filename;
        const updatedContent = await Home.findOneAndUpdate({}, updates,{new:true});
        await updatedContent.save();
        res.status(200).json({
            updatedData:updatedContent
        })
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}

module.exports={getHomeContent,addHomeContent,editHomeContent} 