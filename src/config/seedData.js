const bcrypt = require("bcryptjs");
const Company = require("../models/company.model");
const User = require("../models/user.model");
const Project = require("../models/project.model");
const Task = require("../models/task.model");

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Company.deleteMany({});
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});

    // Create a company
    const company = await Company.create({
      name: "Tech Corp",
      domain: "techcorp.com",
    });

    // Create users
    const adminPassword = await bcrypt.hash("admin123", 10);
    const managerPassword = await bcrypt.hash("manager123", 10);
    const memberPassword = await bcrypt.hash("member123", 10);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@techcorp.com",
      password: adminPassword,
      role: "Admin",
      company: company._id,
    });

    const manager = await User.create({
      name: "Manager User",
      email: "manager@techcorp.com",
      password: managerPassword,
      role: "Manager",
      company: company._id,
    });

    const member = await User.create({
      name: "Member User",
      email: "member@techcorp.com",
      password: memberPassword,
      role: "Member",
      company: company._id,
    });

    // Create projects
    const project1 = await Project.create({
      name: "Website Redesign",
      description: "Redesign company website with modern UI/UX",
      createdBy: admin._id,
      companyId: company._id,
    });

    const project2 = await Project.create({
      name: "Mobile App Development",
      description: "Develop new mobile application for clients",
      createdBy: manager._id,
      companyId: company._id,
    });

    // Create tasks
    await Task.create({
      title: "Design Homepage",
      description: "Create new homepage design with modern layout",
      status: "In Progress",
      assignedTo: member._id,
      projectId: project1._id,
    });

    await Task.create({
      title: "Implement Authentication",
      description: "Add user authentication system",
      status: "To Do",
      assignedTo: member._id,
      projectId: project1._id,
    });

    await Task.create({
      title: "API Development",
      description: "Create RESTful APIs for mobile app",
      status: "Done",
      assignedTo: manager._id,
      projectId: project2._id,
    });

    console.log("Database seeded successfully");

    console.log("\nTest Account Credentials:");
    console.log("Admin - Email: admin@techcorp.com, Password: admin123");
    console.log("Manager - Email: manager@techcorp.com, Password: manager123");
    console.log("Member - Email: member@techcorp.com, Password: member123");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = seedDatabase;
