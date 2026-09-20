const getPermissionName = (permission) => {
  if (!permission) {
    return null;
  }

  if (typeof permission === "string") {
    return permission;
  }

  return permission.name || null;
};

const getRoleSlug = (role) => {
  if (!role) {
    return null;
  }

  if (typeof role === "string") {
    return role;
  }

  return role.slug || role.name || null;
};

const resolveUserAccess = (user) => {
  const permissionSet = new Set();
  const roleSlugs = [];

  for (const role of user?.roles || []) {
    const slug = getRoleSlug(role);

    if (slug) {
      roleSlugs.push(slug);
    }

    for (const permission of role?.permissions || []) {
      const name = getPermissionName(permission);

      if (name) {
        permissionSet.add(name);
      }
    }
  }

  for (const permission of user?.permissions || []) {
    const name = getPermissionName(permission);

    if (name) {
      permissionSet.add(name);
    }
  }

  return {
    roles: [...new Set(roleSlugs)],
    permissions: [...permissionSet],
  };
};

export { resolveUserAccess };
