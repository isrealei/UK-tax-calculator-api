export const getUserProfile = (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "User profile fetched successfully" });
};
