export const handleError = (error: unknown) => {
    console.error(error)
    return { 
      error: "Something went wrong, please try again later",
      status: 500 
    }
  }