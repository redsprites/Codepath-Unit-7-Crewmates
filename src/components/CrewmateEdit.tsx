import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import supabaseInstance from "@/contexts/supabaseInstance";
import { CrewmateCardProps } from '../interfaces';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const CrewmateEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState<CrewmateCardProps |null >(null);
  const supabase = supabaseInstance();

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from('crewMate')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching crewmate:', error);
      } else {
        setCrewmate(data);
      }
    };

    fetchCrewmate();
  }, [id]);
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


  const handleEdit = async (formData: z.infer<typeof formSchema>)  => {

    console.log("Editing...");
    const { data } = await supabase
    .from('crewMate')
    .update(formData)
    .match({ id: id })
  console.log(data)


    navigate(`/crewmates/${id}`);
  };

  const handleDelete =async ()  => {
    console.log("Deleting...");
    const {data, error } = await supabase.from('crewMate').delete().match({id: id})
    if(data){
        console.log(data)
    }
    if(error){
        console.error(error)
    } 
    navigate("/gallary");
  };

  if (!crewmate) return <p>Loading...</p>;

  return (
    <div style={{display: 'flex' , flexDirection:'column', alignContent: 'center', alignItems: 'center'}}>
      <Link to="/gallary"><Button>Back to Gallery </Button></Link>
      <h1>Update Your Crewmate</h1>
      <h3> Current Crewmate Info:</h3>
      <p> {crewmate.name}</p>
      <p>Color: {crewmate.color}</p>
      <p>Speed: {crewmate.speed}</p>
      <p>Created at: {new Date(crewmate.created_at).toLocaleDateString()}</p>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-8">
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
        <Button type="submit">Update Crewmate</Button> {'    '}
        <Button onClick={handleDelete}>Delete Crewmate</Button>
      </form>
    </Form>
    </div>
  );
};

export default CrewmateEdit;
