import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMsgs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const chatRoomId = req.params.chatRoomId;
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  try {
    const messages = await prisma.message.findMany({
      where: { chatRoomId },
      include: {
        from: {
          select: {
            userId: true,
            name: true,
          },
        },
        to: {
          select: {
            userId: true,
            name: true,
          },
        },
      },
      orderBy: {
        timeStamp: "asc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const serializedMessages = messages.map((message) => ({
      ...message,
      id: message.id.toString(),
    }));
    res.status(StatusCodes.ACCEPTED).json(serializedMessages);
  } catch (error) {
    next(error);
  }
};

export const getChatrooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  try {
    const rooms = await prisma.chatRoom.findMany({
      where: {
        participants: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        participants: true,
      },
    });
    res.status(StatusCodes.OK).json(rooms);
  } catch (error) {
    next(error);
  }
};

export const deleteMsg = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { messageId } = req.params;

  try {
    const existingMessage = await prisma.message.findUnique({
      where: { id: BigInt(messageId) },
    });

    if (!existingMessage) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Message not found",
      });
    }

    await prisma.message.delete({
      where: { id: BigInt(messageId) },
    });

    res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
