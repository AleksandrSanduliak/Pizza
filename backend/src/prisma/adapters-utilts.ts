const creationStrategies = {
  array: (data) => {
    create: data.map((item) => creationPrismaAdapter(item));
  },
  object: (data) => {
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        result[key] = { create: creationPrismaAdapter(value) };
      } else if (Array.isArray(value)) {
        result[key] = {
          create: value.map((item) => creationPrismaAdapter(item)),
        };
      } else {
        result[key] = value;
      }
    }
    return result;
  },
  primitive: (data) => data,
};

export const creationPrismaAdapter = (data) => {
  if (Array.isArray(data)) {
    return { create: data.map((item) => creationPrismaAdapter(item)) };
  }
  if (typeof data === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        result[key] = { create: creationPrismaAdapter(value) };
      } else if (Array.isArray(value)) {
        result[key] = {
          create: value.map((item) => creationPrismaAdapter(item)),
        };
      } else {
        result[key] = value;
      }
    }
    return result;
  }

  return data;
};
export const updationPrismaAdapter = (data) => {
  if (Array.isArray(data)) {
    // console.log('data', data)
    return {
      update: data.map(({ id, ...rest }) => {
        return {
          where: id,
          data: updationPrismaAdapter(rest)
        }
      })
    };
  }
  if (typeof data === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(data)) {

      if (typeof value === 'object' && !Array.isArray(value)) {
        console.log('data', data)
        if ('id' in value) {
          const { id, ...rest } = value;
          result[key] = {
            update: {
              where: {
                id: value['id'],
                data: updationPrismaAdapter(rest)
              }
            }
          };
        }

      } else if (Array.isArray(value)) {
        result[key] = {
          update: value.map(({ id, ...rest }) => {
            return {
              where: {
                id: id
              },
              data: updationPrismaAdapter(rest)
            }

          })


        };
      } else {
        result[key] = value;
      }
    }
    return result;
  }

  return data;
};
export const creationPrismaAdapter1 = (data) => {
  if (Array.isArray(data)) {
    creationStrategies.array(data);
  }
  if (typeof data === 'object') {
    creationStrategies.object(data);
  }
  creationStrategies.primitive(data);
  return data;
};
