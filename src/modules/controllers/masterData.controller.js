import {
  createMasterData,
  getAllMasterData,
  getMasterDataById,
  updateMasterData,
  deleteMasterData,
} from "../services/masterData.service.js";

import ApiResponse from "../../utils/ApiResponse.js";


const create = (Model) => async (req, res, next) => {
  try {
    const data = await createMasterData(
      Model,
      req.body
    );

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          data,
          "Created successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};


const getAll = (Model) => async (req, res, next) => {
  try {
    const result = await getAllMasterData(
      Model,
      req.query
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          result,
          "Data fetched successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};


const getById = (Model) => async (req, res, next) => {
  try {
    const data = await getMasterDataById(
      Model,
      req.params.id
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          data,
          "Data fetched successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};


const update = (Model) => async (req, res, next) => {
  try {
    const data = await updateMasterData(
      Model,
      req.params.id,
      req.body
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          data,
          "Updated successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};


const remove = (Model) => async (req, res, next) => {
  try {
    const data = await deleteMasterData(
      Model,
      req.params.id
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          data,
          "Deleted successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};


export {
  create,
  getAll,
  getById,
  update,
  remove,
};