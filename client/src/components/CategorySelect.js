const categories = [
    "Actor/Actress",
    "Director",
    "Production",
    "Camera and Lighting",
    "Costume department",
    "Sound Production",
    "Hair & Make Up",
    "Special effects",
    "Post-production",
    "Sound and music",
];

function CategorySelect({ category, onChange, ...props }) {
    return (
        <select name="category" {...props} value={category} onChange={onChange}>
            {categories.map((x) => (
                <option value={x} key={x}>
                    {x}
                </option>
            ))}
        </select>
    );
}

export default CategorySelect;
