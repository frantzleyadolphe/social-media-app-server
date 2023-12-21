import User from "../models/User.js";

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

    //vu que l utilisateur existe on fait un requete de promesse pour qu'elle utilise Promise.all
    //avec map pour trouver tous les amis de l'utilisateur en fonction de leur ID,
    //et stocke les résultats dans le tableau friends.

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    //on formate ensuite les informations sur les amis en sélectionnant
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

    //on renvoie le tableau formattedFriends sous format JSON
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ Error: err.message });
  }
};

/* UPDATE USER */

export const addRemoveFriend = async (req, res) => {
  try {
    //La fonction récupère d'abord l'identifiant et l'identifiant de l'ami
    //dans les paramètres de la demande. Elle utilise ensuite la méthode findById
    //pour trouver les objets utilisateur et ami sur la base de leurs identifiants respectifs.

    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    //Si l'utilisateur a déjà l'ami dans sa liste d'amis, la fonction
    //supprime l'ami de la liste d'amis de l'utilisateur et vice versa.
    //Dans le cas contraire, elle ajoute l'ami à la liste d'amis de l'utilisateur
    //et l'utilisateur à la liste d'amis de l'ami.

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    //Après avoir mis à jour les objets utilisateur et ami, la fonction récupère
    //la liste d'amis mise à jour pour l'utilisateur. Elle formate ensuite les
    //informations sur les amis en sélectionnant des champs spécifiques et crée
    //un nouveau tableau appelé formattedFriends.

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
