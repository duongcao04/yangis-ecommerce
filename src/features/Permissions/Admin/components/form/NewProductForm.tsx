import { useForm } from 'react-hook-form'

import { MultipleImageUpload } from '@/components/form-feild/MultipleImageUpload'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants/imageValidate'
import { useGetBrands } from '@/hooks/useBrand'
import { useGetCategories } from '@/hooks/useCategory'
import { useCreateProduct } from '@/hooks/useProduct'
import { INewProduct } from '@/types/product'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import AddColor from '../form-feild/AddColor'
import { SingleImageUpload } from '../form-feild/SingleImageUpload'

const FormSchema = z.object({
    name: z.string().min(1, 'Tên sản phẩm là trường bắt buộc').max(255, {
        message: 'Không được nhập tên sản phẩm quá 255 ký tự.',
    }),
    thumbnail: z.any(),
    description: z.string().optional(),
    featureImage: z.array(
        z
            .any()
            .refine((file) => file?.size < MAX_FILE_SIZE, 'Tệp không hợp lệ')
            .refine(
                (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
                'Chỉ hỗ trợ định dạng .jpg, .jpeg, .png, .webp.'
            )
    ),
    price: z.string().min(1, { message: 'Giá tiền là trường bắt buộc' }),
    sale: z.string().optional(),
    category: z.string().nonempty({ message: 'Danh mục là trường bắt buộc' }),
    brand: z.string().nonempty({ message: 'Nhà cung cấp là trường bắt buộc' }),
    variants: z.string().array().min(1, 'Màu sắc là trường bắt buộc'),
})

function NewProductForm() {
    const { createAProduct } = useCreateProduct()
    const { categories } = useGetCategories()
    const { brands } = useGetBrands()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            thumbnail: undefined,
            description: '',
            featureImage: [],
            price: '',
            sale: '',
            category: '',
            brand: '',
            variants: [],
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const newProduct: INewProduct = {
            name: data.name,
            description: data.description,
            thumbnail: data.thumbnail,
            featureImage: data.featureImage,
            price: +data.price,
            sale: data.sale,
            category: data.category,
            brand: data.brand,
            variants: data.variants,
        }
        await createAProduct(newProduct)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="grid grid-cols-3 gap-5">
                    <div className="h-fit col-span-2 bg-white p-6 rounded-xl space-y-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel required htmlFor="name">
                                        Tên sản phẩm
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="name"
                                            placeholder="Nhập tên sản phẩm"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-5">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel required htmlFor="name">
                                            Giá tiền
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="name"
                                                type="number"
                                                placeholder="Nhập giá tiền"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sale"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="name">
                                            Giảm giá
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="name"
                                                type="number"
                                                placeholder="Nhập giảm giá"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel required>Danh mục</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn danh mục" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    value={category._id}
                                                    key={category._id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel required>Thương hiệu</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn nhà cung cấp" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {brands.map((brand) => (
                                                <SelectItem
                                                    value={brand._id}
                                                    key={brand._id}
                                                >
                                                    {brand.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="variants"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel required htmlFor="color">
                                        Màu sắc
                                    </FormLabel>
                                    <FormControl>
                                        <AddColor
                                            {...field}
                                            id="color"
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full h-[50px]"
                            title="Thêm sản phẩm"
                        >
                            Thêm sản phẩm
                        </Button>
                    </div>
                    <div className="col-span-1 bg-white p-6 rounded-xl space-y-5 h-fit">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="description">
                                        Mô tả sản phẩm
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea {...field} id="description" />
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        Không được vượt quá 100 ký tự khi nhập
                                        mô tả sản phẩm.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="thumbnail">
                                        Hình thu nhỏ
                                    </FormLabel>
                                    <FormControl>
                                        <SingleImageUpload
                                            {...field}
                                            id="thumbnail"
                                            label="Hình thu nhỏ"
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="featureImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="featureImage">
                                        Ảnh nổi bật
                                    </FormLabel>
                                    <FormControl>
                                        <MultipleImageUpload
                                            {...field}
                                            id="featureImage"
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default NewProductForm
