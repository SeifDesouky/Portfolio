const Skills = require('../Models/SkillsModel')


const getAllSkills= async (req, res) => {
    try {
        const skills = await Skills.find({ isDeleted: false });
        res.status(200).json({
            data: skills,
            message:"Skills fetched successfully"
        })
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

const createCategory= async (req, res) => {
    try {
        const { category, skill } = req.body;
        const newSkill = new Skills({ category, skill });
        await newSkill.save();
        res.status(201).json({data : newSkill,message:"skill add successfully",count:newSkill.length})
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

const addSkillToCategory = async (req, res) => {
    try {
        const { category } = req.params;
        console.log(category);
        const categoryLower = category.toLowerCase();
        console.log(categoryLower);
        
        const { name, img } = req.body
        const category1 = await Skills.findOne({category:category});
        console.log(category1);
        
        if (!category1) return res.status(404).json({ message: "Category Not Found" });
        category1.skill.push({ name, img })
        await category1.save();

        res.status(201).json({data:category1,message:"Add skill successfully"})
    } catch (err) {
        res.status(500).json({ error: err })
        console.log(err.message);
        
    }
}

const updateSkill = async (req, res) => {
    try {
        const id = req.params.id;
        const { category, skill } = req.body;
       
        const updatedSkill = await Skills.findById(id)
        if (updateSkill) {
            updatedSkill.category = category;
            updatedSkill.skill = skill;
            
            await updatedSkill.save()
            res.status(201).json({message:"skill updated successfully",data:updateSkill})
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

const softDeleteSkillCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Skills.findById(id);

    if (!category) return res.status(404).json({ message: "Category not found" });

    category.isDeleted = true;
    await category.save();

    res.status(200).json({ message: "Category soft deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {getAllSkills,createCategory,addSkillToCategory,updateSkill ,softDeleteSkillCategory};