import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"; 
import supabaseInstance from "../contexts/supabaseInstance"

const CreateCrewmate = () => {
    const navigate = useNavigate();
    const supabase = supabaseInstance()

    const insertCrewMate = async (formData: z.infer<typeof formSchema>) => {
        const { error } = await supabase
          .from('crewMate')
          .insert(formData)
        if (error) {
            console.error('Insert error:', error);
        }
        else{
            navigate('/gallary')       
        }
      }
    const formSchema = z.object({
        name : z.string().min(2, {
          message: "name must be at least 2 characters.",
        }),
        speed : z.number().int().min(0, {
            message: "speed must be a positive number.",
            }),
        color : z.string()
      })
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        speed: 0,
        color: "",
    },
    })
    const {
        register,
    } = form;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await insertCrewMate(values);
      }

return(
    <>
     <div style={{display: 'flex' , flexDirection:'column', alignContent: 'center', alignItems: 'center'}}>
    <Link to='/'>Home</Link>        <h1>Create a new Crewmate</h1>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-blue-500 font-bold">Name </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="speed"
          render={() => (
            <FormItem>
              <FormLabel>Speed </FormLabel>
                <FormControl>
                    <Input 
                    type="number" 
                    placeholder="Enter speed"
                    {...register('speed', {
                        setValueAs: value => value === "" ? 0 : parseInt(value, 10)
                    })} 
                    />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<FormField
  control={form.control}
  name="color"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Color </FormLabel>
      <FormControl>
        <div className="space-y-2">
          {['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Orange', 'Pink', 'Rainbow'].map((color) => (
            <label key={color}>
            <Input
                type="radio"
                name={field.name}
                value={color}
                checked={field.value === color}
                onChange={field.onChange}
                onBlur={field.onBlur}
                className="mr-2"
                />
                {color}
            </label>
          ))}
        </div>
      </FormControl>
     
      <FormMessage />
    </FormItem>
  )}
/>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
    </>
    
)
}

export default CreateCrewmate;