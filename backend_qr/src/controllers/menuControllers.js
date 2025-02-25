import MenuModel from "../model/Menu.js";
export const createMenuItem = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      image,
      category,
      status,
      noOfServing,
    } = req.body;
    console.log(req.body);

    // Create a new menu item
    const newMenuItem = new MenuModel({
      name,
      price,
      description,
      image,
      category,
      status,
      noOfServing,
    });

    await newMenuItem.save();

    res.status(201).json({
      message: "Menu item added successfully",
      menuItem: newMenuItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding menu item",
      error: error.message,
    });
  }
};

export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuModel.find();
    res.status(200).json(menuItems);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching menu items", error: error.message });
  }
};
