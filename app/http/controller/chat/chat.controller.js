const { AdsModel } = require("../../../models/ads/ads.model");
const { ChatModel } = require("../../../models/chats/chats.model");
const { UserPersonelModel } = require("../../../models/users/users.model");
const { verifyAccessToken } = require("../../../modules/functions");
const Controller = require("../controller");

//Public Class
class ChatController extends Controller {
  async createChat(req, res, next) {
    try {
      const {
        chatUserId,
      } = req.body;

      try {
       
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await UserModel.findOne({
          phone: verifyResult.phone,
        });
        const userPersonel = await UserPersonelModel.findOne({
          phone: verifyResult.phone,
        });

        const userFinder = await UserPersonelModel.findOne({
            id:chatUserId
        });

        const getRandomInteger = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
  
            return Math.floor(Math.random() * (max - min)) + min;
          };
  
          const randId = getRandomInteger(100000, 999999);
  


        if(user){

            const createChat = await ChatModel.create({ 
                chatName:randId,
                secondPerson: userFinder._id,
                secondPersonName: userFinder.name + " " + userFinder.lastName,
                adminUser: user._id,
                adminUserName: user.name + " " + user.lastName
            })

        }

        if(userPersonel){

            const createChat = await ChatModel.create({ 
                chatName:randId,
                secondPerson: userFinder._id,
                secondPersonName: userFinder.name + " " + userFinder.lastName,
                adminUser: userPersonel._id,
                adminUserName: userPersonel.name + " " + userPersonel.lastName
            })

        }


        res.status(202).json({
          status: 202,
          message: ` add : ${addName} created`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }


}
module.exports = { ChatController: new ChatController() };
