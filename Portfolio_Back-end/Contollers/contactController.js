const Contact = require('../Models/contactModel');

const getMsgs = async (req, res) => {
    const contactContent = await Contact.find({ isDeleted: false });
    if (!contactContent) {
        res.status(200).json({message:"Contact not found"})
    }
    res.json({data:contactContent,count:contactContent.length})
}

const addMsg = async (req, res) => {
    try {
        const { name,email,msg } = req.body;
        const newMsg = new Contact({
            name,email,msg
        });
        await newMsg.save();
        res.status(200).json({
            data: newMsg,
            message: `Msg add succssefully`
        })
    } catch (err) {
        res.status(500).json({error:err.message})
    } 
}

const softDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await Contact.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!updated) {
            return res.status(404).json({ message: 'comment not found' });
        }
        res.status(200).json({message:'comment deleted successfully',data:updated})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
module.exports = { getMsgs, addMsg,  softDelete};
