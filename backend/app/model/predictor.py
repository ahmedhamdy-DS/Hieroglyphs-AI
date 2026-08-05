"""
منطق التنبؤ الأساسي (نفس اللي كان في pages/1_Translator.py) بعد ما اتفصل عن الـ UI.
"""
import numpy as np
from PIL import Image

from .loader import get_model
from ..data import LABEL_MAP, GARDINER_CATEGORIES, CODE_TO_INFO

IMG_SIZE = (299, 299)  # مقاس الإدخال بتاع InceptionV3


def preprocess(image: Image.Image) -> np.ndarray:
    """يجهز الصورة بنفس طريقة المشروع الأصلي (resize + normalize)."""
    image = image.convert("RGB").resize(IMG_SIZE)
    arr = np.array(image).astype("float32") / 255.0
    return np.expand_dims(arr, axis=0)


def predict_image(image: Image.Image) -> dict:
    """
    يرجع dict فيه: code, name, description, confidence, category
    نفس منطق الـ fallback الثلاثي اللي كان في الكود الأصلي:
      1) تطابق كامل في code_to_info
      2) تطابق فئة Gardiner بس (الحرف الأول من الكود)
      3) رمز غير معروف (Mystery Symbol)
    """
    try:
        model = get_model()
        img_array = preprocess(image)

        preds = model.predict(img_array, verbose=0)
        class_idx = int(np.argmax(preds))
        confidence = float(np.max(preds))

        code = LABEL_MAP.get(class_idx)

        if code and code in CODE_TO_INFO:
            name, desc = CODE_TO_INFO[code]
            category = GARDINER_CATEGORIES.get(
                "".join(filter(str.isalpha, code))
            )
        elif code:
            prefix = "".join(filter(str.isalpha, code))
            category = GARDINER_CATEGORIES.get(prefix)
            if category:
                name = code
                desc = (
                    f"رمز من فئة '{category}'. الرمز ده مش موجود بتفاصيله في قاعدة "
                    f"بياناتنا لسه، لكنه بينتمي لعائلة الرموز اللي بتمثل '{category}'."
                )
            else:
                name = "رمز غامض"
                code = "Unclassified"
                category = None
                desc = "رمز نادر أو غير مصنف. فئته مش معروفة في نظام جاردنر القياسي."
        else:
            name = "رمز غامض"
            code = "Unknown"
            category = None
            desc = "رمز نادر أو غير معروف. الذكاء الاصطناعي ملقاش تطابق واضح ليه."

        return {
            "code": code,
            "name": name,
            "description": desc,
            "category": category,
            "confidence": round(confidence, 4),
        }

    except Exception as e:  # حماية عامة زي الكود الأصلي
        return {
            "code": "Error",
            "name": "Prediction Error",
            "description": str(e),
            "category": None,
            "confidence": 0.0,
        }
