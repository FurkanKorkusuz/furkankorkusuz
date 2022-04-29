using Core.Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.ValidationRules.FluentValidation
{
    public class ProductValidator : AbstractValidator<Brand>
    {
        public ProductValidator()
        {
            RuleFor(p => p.BrandName).NotEmpty().WithMessage("Ürün adı boş geçilemez.");
            RuleFor(p => p.BrandName).Length(3,500).WithMessage("Ürün 3 ile 500 karakter arasında olmalıdır.");
            RuleFor(p => p.BrandName).NotEmpty().WithMessage("Ürün fiyatı boş geçilemez.");
            RuleFor(p => p.ID).GreaterThanOrEqualTo(10).WithMessage("CategoryID 0 olanın ShowPrice değeri 10 dan büyük ya da eşit olmalı.");

            // Özel kuralları böyle çağırırım.
            RuleFor(p => p.BrandName).Must(MyRule);
        }

        // Özel kurallar yazabilirim
        private bool MyRule(string arg)
        {
            return arg.StartsWith("f");
        }
    }
}
