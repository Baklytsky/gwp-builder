export const createGWP = async({ variant, threshold }: any)  => {
  return prisma.gwp.create({
    data: {
      variant: variant,
      threshold: threshold
    }
  });
}

export const GetGWP = async()  => {
  return prisma.gwp.findMany();
}

