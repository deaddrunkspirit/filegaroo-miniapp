/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/contents/": {
    /** Create Content */
    post: operations["create_content_contents__post"];
  };
  "/contents/{content_id}": {
    /** Get Content */
    get: operations["get_content_contents__content_id__get"];
    /** Update Content */
    put: operations["update_content_contents__content_id__put"];
    /** Delete Content */
    delete: operations["delete_content_contents__content_id__delete"];
  };
  "/contents/parent/{parent_content_id}": {
    /** Get Contents By Parent Id */
    get: operations["get_contents_by_parent_id_contents_parent__parent_content_id__get"];
  };
  "/contents/parent": {
    /** Get Contents By Parent Id */
    get: operations["get_contents_by_parent_id_contents_parent_get"];
  };
  "/contents/folders/{parent_content_id}": {
    /** Get Folders By User Id And Parent Content Id */
    get: operations["get_folders_by_user_id_and_parent_content_id_contents_folders__parent_content_id__get"];
  };
  "/contents/folders": {
    /** Get Root Folders By User Id */
    get: operations["get_root_folders_by_user_id_contents_folders_get"];
  };
  "/contents/forward_message/{content_id}": {
    /** Forward Message */
    post: operations["forward_message_contents_forward_message__content_id__post"];
  };
  "/users/auth": {
    /** Authenticate User */
    post: operations["authenticate_user_users_auth_post"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** ContentCreate */
    ContentCreate: {
      /** Title */
      title: string;
      /** Type */
      type: number;
      /** Parent Content Id */
      parent_content_id?: number | null;
      /** User Id */
      user_id: number;
      /** Tg Chat Id */
      tg_chat_id?: number | null;
      /** Tg Message Id */
      tg_message_id?: number | null;
      /** Body */
      body?: string | null;
      /** Attachment */
      attachment?: number | null;
    };
    /** ContentRead */
    ContentRead: {
      /** Title */
      title: string;
      /** Type */
      type: number;
      /** Parent Content Id */
      parent_content_id?: number | null;
      /** User Id */
      user_id: number;
      /** Tg Chat Id */
      tg_chat_id?: number | null;
      /** Tg Message Id */
      tg_message_id?: number | null;
      /** Body */
      body?: string | null;
      /** Attachment */
      attachment?: number | null;
      /** Id */
      id: number;
    };
    /** ContentUpdate */
    ContentUpdate: {
      /** Title */
      title: string;
      /** Type */
      type: number;
      /** Parent Content Id */
      parent_content_id?: number | null;
      /** User Id */
      user_id: number;
      /** Tg Chat Id */
      tg_chat_id?: number | null;
      /** Tg Message Id */
      tg_message_id?: number | null;
      /** Body */
      body?: string | null;
      /** Attachment */
      attachment?: number | null;
    };
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][];
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /** Create Content */
  create_content_contents__post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["ContentCreate"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ContentRead"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Content */
  get_content_contents__content_id__get: {
    parameters: {
      path: {
        content_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ContentRead"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Update Content */
  update_content_contents__content_id__put: {
    parameters: {
      path: {
        content_id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ContentUpdate"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ContentRead"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Delete Content */
  delete_content_contents__content_id__delete: {
    parameters: {
      path: {
        content_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ContentRead"][];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Contents By Parent Id */
  get_contents_by_parent_id_contents_parent__parent_content_id__get: {
    parameters: {
      path: {
        parent_content_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ContentRead"][];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Contents By Parent Id */
  get_contents_by_parent_id_contents_parent_get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ContentRead"][];
        };
      };
    };
  };
  /** Get Folders By User Id And Parent Content Id */
  get_folders_by_user_id_and_parent_content_id_contents_folders__parent_content_id__get: {
    parameters: {
      path: {
        parent_content_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ContentRead"][];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Root Folders By User Id */
  get_root_folders_by_user_id_contents_folders_get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ContentRead"][];
        };
      };
    };
  };
  /** Forward Message */
  forward_message_contents_forward_message__content_id__post: {
    parameters: {
      path: {
        content_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ContentRead"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Authenticate User */
  authenticate_user_users_auth_post: {
    requestBody: {
      content: {
        "application/json": Record<string, never>;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
}