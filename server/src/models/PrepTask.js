import mongoose from "mongoose";

const prepTaskSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
      maxlength: [80, "Item name cannot exceed 80 characters"]
    },
    quantity: {
      type: String,
      required: [true, "Quantity is required"],
      trim: true,
      maxlength: [30, "Quantity cannot exceed 30 characters"]
    },
    station: {
      type: String,
      enum: ["General", "Grill", "Fryer", "Larder", "Pastry"],
      default: "General"
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },
    dueTime: {
      type: String,
      required: [true, "Due time is required"]
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending"
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [250, "Notes cannot exceed 250 characters"],
      default: ""
    }
  },
  { timestamps: true }
);

export const PrepTask = mongoose.model("PrepTask", prepTaskSchema);

