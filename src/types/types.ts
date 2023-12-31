
export type links = {
    email: string,
    github: string,
    linkedin: string,
    id: string
}

export type description = {
    description: string,
    id: string
}

export type linksDb = [
    links,
    description
]

export type skill = {
    id: string,
    icon: string,
    name: string,
    order: number,
}


export type project = {
    description: string,
    isFullstack?: boolean,
    isHidden?: boolean,
    name: string,
    url_github: string,
    url_preview: string,
    id: string,
    img: picture ,
    created_at: string,    
}

export type formData<T = project | skill> = Partial<T>

export type picture = {
    name: string,
    url: string,
    fullName: string
}

export type PreviewCoompProps = {
    initialData: unknown
}

export type user = {
    email: string,
    password: string
}