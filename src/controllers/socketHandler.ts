import { Server, Socket } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Msg {
  from: string;
  to: string;
  content: string;
}

const USERS = new Map<string, string>();

export default (io: Server) => {
  io.use((socket: Socket, next) => {
    const userId = socket.handshake.headers.user_id as string;
    USERS.set(userId, socket.id);
    next();
  });

  io.on("connection", (socket: Socket) => {
    console.log("connected id:" + socket.id);
    console.log(USERS);

    socket.on("send-msg", async (data: Msg) => {
      console.log(data);
      const toSocket = USERS.get(data.to) as string;
      console.log(toSocket);
      if (toSocket !== undefined) {
        io.to(toSocket).emit("receive-msg", data);
      } else {
        console.log(`User ${data.to} not connected`);
      }

      let chatRoom = await prisma.chatRoom.findFirst({
        where: {
          participants: {
            every: {
              userId: {
                in: [data.to, data.from],
              },
            },
          },
        },
      });

      if (!chatRoom) {
        chatRoom = await prisma.chatRoom.create({
          data: {
            participants: {
              connect: [{ userId: data.from }, { userId: data.to }],
            },
          },
        });
      }

      await prisma.message.create({
        data: {
          fromId: data.from,
          toId: data.to,
          content: data.content,
          timeStamp: new Date(),
          chatRoomId: chatRoom.id,
        },
      });
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of USERS.entries()) {
        if (socketId === socket.id) {
          USERS.delete(userId);
          break;
        }
      }
      console.log("disconnected id:" + socket.id);
    });
  });
};
