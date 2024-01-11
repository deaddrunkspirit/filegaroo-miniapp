interface PlaceholderProps {
    text: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({text}) => {
    return <div className="bg-light-primary dark:bg-dark-primary text-light-onprimary dark:text-dark-onprimary h-dvh">
        {text}
    </div>
}

export default Placeholder;