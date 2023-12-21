import User from "../models/User";

/* READ USER By id */

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ Error: err.message });
  }
};

/*GET USER FRIENDS */

export const getUserFriend = async (req, res) => {
  try {
    const { id } = req.params;
    //on cherche si l utilisateur existe vraiment
    const user = await User.findById(id);

    //vu que l utilisateur existe on fait un requete de promesse pour elle utilise Promise.all
    //avec map pour trouver tous les amis de l'utilisateur en fonction de leur ID,
    //et stocke les résultats dans le tableau friends.

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    //formate ensuite les informations sur les amis en sélectionnant
    //des champs spécifiques et crée un nouveau tableau appelé formattedFriends

    let formattedFriends = [];
    friends.map((friend) => {
      formattedFriends.push({
        _id: friend._id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        occupation: friend.occupation,
        location: friend.location,
        picturePath: friend.picturePath,
      });
    });
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ Error: err.message });
  }
};

/* UPDATE USER */

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    //formate ensuite les informations sur les amis en sélectionnant
    //des champs spécifiques et crée un nouveau tableau appelé formattedFriends

    let formattedFriends = [];
    friends.map((friend) => {
      formattedFriends.push({
        _id: friend._id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        occupation: friend.occupation,
        location: friend.location,
        picturePath: friend.picturePath,
      });
    });
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ Error: err.message });
  }
};
