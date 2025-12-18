type Tag = {
    _id: string;
    name: string;
    color: string;
}

type Questions = {
    question: string;
    options: {
        a: string;
        b: string;
        c: string;
        d: string;
    };
    answer: string;
    explaination: string;
    _id: string
}

export type Note = {
    options: {
        isPublic: boolean;
        bookmarked: boolean;
      };
    _id: string;
    creator: {
        _id: string;
        username: string;
        email: string;
        deactivated: boolean;
        createdAt: string;
        updatedAt: string;
        pfp: string;
    };  
    title: string;
    fileContent: string;
    access: string[]; 
    createdAt: string;
    updatedAt: string;
    description: string;
    tags: Tag[];
}

export type Quiz = {
    _id: string;
    note: string;
    quizTitle: string;
    description: string;
    questions: Questions[]
    createdAt: string;
    updatedAt: string; 
}
   
export type Users = {
    _id: string,
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    deactivated: boolean

}
