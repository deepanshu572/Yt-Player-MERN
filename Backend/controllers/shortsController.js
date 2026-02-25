import shorts from "../model/shortModel.js";

export const handletoggleLikes = async (req, res) => {
  try {
    const { shortId } = req.params;
    const userId = req.userId.toString();
    const short = await shorts.findOne({ _id: shortId });
    if (short.like.includes(userId)) {
      console.log("done");
      short.like.pull(userId);
    } else {
      short.like.push(userId);
      short.dislike.pull(userId);
      console.log("check kar!");
    }
    await short.save();
    return res.status(200).json({ short });
  } catch (error) {
    console.log(error);
  }
};
export const handletoggleDisLikes = async (req, res) => {
  try {
    const { shortId } = req.params;
    const userId = req.userId.toString();

    const short = await shorts.findById(shortId);
    if (!short) return res.status(404).json({ message: "Short not found" });

    if (short.dislike.includes(userId)) {
      short.dislike.pull(userId);
      console.log("Dislike removed");
    } else {
      short.dislike.push(userId);
      short.like.pull(userId);
      console.log("Dislike added, like removed if existed");
    }

    await short.save();
    return res.status(200).json({ short });
  } catch (error) {
    console.error("Error toggling dislike:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const handleSaveBy = async (req, res) => {
  try {
    const { shortId } = req.params;
    const userId = req.userId.toString();
    const short = await shorts.findById(shortId);
    if (!short) return res.status(404).json({ message: "Short not found" });
    if (short.saveBy.includes(userId)) {
      short.saveBy.pull(userId);
      console.log("unsaved");
    } else {
      short.saveBy.push(userId);
      console.log("saved");
    }
    await short.save();
    return res.status(200).json({ short });
  } catch (error) {
    console.error("Error toggling dislike:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const handleAddComment = async (req, res) => {
  try {
    const { shortId } = req.params;
    const userId = req.userId;
    const { message } = req.body;
    if (!shortId || !userId || !message) {
      return res.status(400).json({
        message:
          " shortId || userId || message is missing or undefined or null",
      });
    }
    const short = await shorts.findOne({ _id: shortId });

    if (!short) {
      return res.status(400).json({
        message: "shortId not mached",
      });
    }
    short?.comments.push({
      author: userId,
      message: message,
    });

    await short.save();
    await short.populate([
      { path: "channel" },
      { path: "comments.author" },
      { path: "comments.replies.author" },
    ]);

    return res.status(200).json({ short });
  } catch (error) {
    console.log(`something wents wrong in handleAddComment fnc ${error}`);
  }
};
export const handleAddReply = async (req, res) => {
  try {
    const { shortId } = req.params;
    const userId = req.userId;
    const { message, commentId } = req.body;
    if (!shortId || !userId || !message || !commentId) {
      return res.status(400).json({
        message:
          " shortId || userId || message || commentId  is missing or undefined or null",
      });
    }
    const short = await shorts.findOne({ _id: shortId });
    if (!short) {
      return res.status(400).json({
        message: "shortId not matched",
      });
    }

    const comment = short.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "comment not found",
      });
    }

    comment?.replies?.push({
      author: userId,
      message: message,
    });
    await short.save();
    await short.populate([
      { path: "channel" },
      { path: "comments.author" },
      { path: "comments.replies.author" },
    ]);

    return res.status(200).json({ short });
  } catch (error) {
    console.log(error);
  }
};

export const handleAddViews = async (req, res) => {
  try {
    const { shortId } = req.params;
    const short = await shorts.findOne({ _id: shortId });
    if (!short) {
      return res
        .status(400)
        .json("shorts not found! in  shorts controller handleAddViews fnc");
    }
    // console.log(short)
    short.views += 1;
    await short.save();
    return res.status(200).json({ short });
  } catch (err) {
    return res
      .status(400)
      .json(
        "somthing wents wrong in  shorts controller handleAddViews fnc" + err,
      );
  }
};
export const handleDeleteShort = async (req, res) => {
  try {
    const { shortId } = req.params;
    if (!shortId) {
      return res.status(400).json({
        message: "Short not found in handleDeleteShort fnc",
      });
    }
    const short = await shorts.findByIdAndDelete(shortId);
    return res.status(200).json({ short });
  } catch (err) {
    return res.status(400).json({
      message: "somthing wents wrong in handleDeleteShort fnc" + err,
    });
  }
};
export const handleUpdateShort = async (req, res) => {
  try {
    const { shortId } = req.params;
    // console.log(req.body)
    const { title, description, tags } = req.body;
    // console.log(title, description, tags)
    if (!title || !description || !tags) {
      return res
        .status(400)
        .json({ message: "Title, description And tags is not found !" });
    }
    const short = await shorts.findById(shortId);
    if (!short) {
      return res.status(400).json({
        message: "Short not found in handleUpdateShort fnc",
      });
    }
    short.title = title || short.title;
    short.description = description || short.description;
    short.tags = tags || short.tags;
    await short.save();
    return res.status(200).json({ short });
  } catch (err) {
    return res.status(400).json({
      message: "somthing wents wrong in handleUpdateShort fnc" + err,
    });
  }
};
