import { useEffect, useState } from "react"
import { View } from "react-native"

import RenderHTML from 'react-native-render-html'

const APIKEY = '68ca40677c7b4d3fa5fd36d44dd636a6'


export default function recipe() {

    const [ingredients, setIngredients] = useState<string[]>([])
    const [instructions, setInstructions] = useState<string>("")

    useEffect(() => {
        try {
            fetch(`https://api.spoonacular.com/recipes/650126/information?apiKey=${APIKEY}`)
            .then((res) => res.json())
            .then((recipe) => {
                console.log(recipe)
                console.log(recipe.instructions)

                setInstructions(recipe.instructions || "")

                const recipeIngredients = recipe.extendedIngredients
                for(const ingredient of recipeIngredients){
                    setIngredients([...ingredients, ingredient])
                }
                console.log(recipe.extendedIngredients)
                }
            )
            
            
        }
        catch (err){
            console.log(err)
        }
        
    }, [])

    return (
        <View>
            <RenderHTML
                source={{html: instructions}}
            />
        </View>
    )

}