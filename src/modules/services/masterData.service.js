import ApiError from "../../../utils/apiError.js";

import {
  findByName,
  create,
  findAll,
  findById,
  updateById,
  deleteById,
} from "../repositories/masterData.repository.js";

const createMasterData = async (Model, payload) => {
  const {
    name,
    code,
    description,
  } = payload;

  if (!name || !name.trim()) {
    throw ApiError.badRequest("Name is required");
  }

  const existing = await findByName(Model, name);

  if (existing) {
    throw ApiError.conflict("Already exists");
  }

  return await create(Model, {
    name: name.trim(),
    ...(code && {
      code: code.trim(),
    }),
    ...(description && {
      description: description.trim(),
    }),
  });
};
const getAllMasterData = async (Model, query) => {
  let {
    page = 1,
    limit = 10,
    search = "",
    sortBy = "createdAt",
    sortOrder = "desc",
    isActive,
  } = query;

  page = Number(page);
  limit = Number(limit);

  // Prevent invalid pagination values
  if (page < 1) {
    page = 1;
  }

  if (limit < 1) {
    limit = 10;
  }

  // Maximum records per request
  if (limit > 100) {
    limit = 100;
  }

  // Convert filter
  if (isActive !== undefined) {
    if (isActive === "true") {
      isActive = true;
    } else if (isActive === "false") {
      isActive = false;
    } else {
      throw ApiError.badRequest(
        "isActive must be true or false"
      );
    }
  }

  const result = await findAll(Model, {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    isActive,
  });

  const totalPages = Math.ceil(
    result.total / limit
  );

  return {
    data: result.data,

    pagination: {
      total: result.total,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};
const getMasterDataById = async (Model, id) => {
  const data = await findById(Model, id);

  if (!data) {
    throw ApiError.notFound("Data not found");
  }

  return data;
};

const updateMasterData = async (
  Model,
  id,
  payload
) => {
  const {
    name,
    code,
    description,
    isActive,
  } = payload;

  const updateData = {};

  if (name !== undefined) {
    if (!name.trim()) {
      throw ApiError.badRequest(
        "Name cannot be empty"
      );
    }

    updateData.name = name.trim();
  }

  if (code !== undefined) {
    updateData.code = code.trim();
  }

  if (description !== undefined) {
    updateData.description =
      description.trim();
  }

  if (isActive !== undefined) {
    updateData.isActive = isActive;
  }

  const data = await updateById(
    Model,
    id,
    updateData
  );

  if (!data) {
    throw ApiError.notFound("Data not found");
  }

  return data;
};

const deleteMasterData = async (Model, id) => {
  const data = await deleteById(Model, id);

  if (!data) {
    throw ApiError.notFound("Data not found");
  }

  return data;
};
export {
  createMasterData,
  getAllMasterData,
  getMasterDataById,
  updateMasterData,
  deleteMasterData,
};