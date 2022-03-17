const doc = {
    swagger: "2.0",

    info: {
        title: "Welcome Restaurant app",
        description: "this app is used for getting resaurant and its ratings",
        version: "1.0.0",

        license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT"
        },

        host: "localhost:3030",
        basePath: "/",

        tags: [
            {
                name: "Restaurant",
                description: "api endpoint for Restaurant related service",
            }
        ],

        schemes: [ "http" ],
        consumes: [ "application/json" ],
        produces: [ "application/json" ],

        contact: {
            email: "ademolaolutomiwa4real@gmail.com",
            name: "ademola olutomiwa",
            phone: "+2349034119761"
        }
    },

    paths: {
        "/api/restaurants": {
            get: {
                tags: [ "Restaurant" ],
                summary: "get all restaurants on server",
                description: "route handler to get all the users in the application",
                parameters: [
                    {
                        name: "pageNumber",
                        in: "query",
                        type: "integer",
                        required: true,
                    },
                    {
                        name: "pageSize",
                        in: "query",
                        type: "integer",
                        required: true,
                    }
                ],
    
                responses: {
                    200: {
                        description: "Ok/success",
                        schema: {
                            type: "array",
                            items: {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
    
                                        data: {
                                            schema: {
                                                type: "object",
                                                properties: {
                                                    address: {
                                                        schema:{
                                                            type: "object",
                                                            properties: {
                                                                building: "string",
                                                                street: "string",
                                                            }
                                                        }
                                                    },
    
                                                    grades: {
                                                        schema: {
                                                            type: "array",
                                                            items: {
                                                                schema: {
                                                                    type: "object",
                                                                    properties: {
                                                                        date: "object",
                                                                        grade: "string",
                                                                        score: "integer"
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
    
                                                    cuisine: {
                                                        type: "string"
                                                    },
                                                    name: {
                                                        type: "string",
                                                    },
    
                                                    restaurant_id: {
                                                        type: "string",
                                                    }
                                                }
                                            }
                                        },
                                    }
                                }
                            }
                        }
                    },
                    500: {
                        description: "failure",
                        summary: "problem with server"
                    }
                }
            }
        },

        "/api/restaurants/{id}": {
            get: {
                tags: [ "Restaurant" ],
                description: "route handler for a single restaurant by id",
                summary: "get restaurant by id",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "the id the server will find to find the restaurant object"
                    }
                ],
    
                responses: {
                    200: {
                        description: "Ok/success",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },

                                data: {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            address: {
                                                schema:{
                                                    type: "object",
                                                    properties: {
                                                        building: "string",
                                                        street: "string",
                                                    }
                                                }
                                            },

                                            grades: {
                                                schema: {
                                                    type: "array",
                                                    items: {
                                                        schema: {
                                                            type: "object",
                                                            properties: {
                                                                date: "object",
                                                                grade: "string",
                                                                score: "integer"
                                                            }
                                                        }
                                                    }
                                                }
                                            },

                                            cuisine: {
                                                type: "string"
                                            },
                                            name: {
                                                type: "string",
                                            },

                                            restaurant_id: {
                                                type: "string",
                                            }
                                        }
                                    }
                                },
                            }
                        }
                    },
    
                    404: {
                        description: "User not found",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },

                                data: {
                                    type: "object",
                                }
                            }
                        }
                    },

                    400: {
                        description: "invalid object id",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },

                                data: {
                                    type: "object",
                                }
                            }
                        }
                    },

                    500: {
                        description: "server error"
                    }
                }
            }
        }
    }
};

export default doc;